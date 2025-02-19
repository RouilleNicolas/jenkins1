import { logger, PromiseExecutor } from '@nx/devkit';
import { Buffer } from 'buffer';
import { execSync } from 'node:child_process';
import { CreateSonarProjectExecutorSchema } from './schema';

const isStatusInvalid = (status: number) => status !== 200 && status !== 204;

const runExecutor: PromiseExecutor<CreateSonarProjectExecutorSchema> = async (
  options,
  context,
) => {
  // filter(String) removes empty lines
  const affectedProjects = execSync(`npx nx show projects --affected`)
    .toString()
    .split('\n')
    .filter(String);

  for (const project of affectedProjects) {
    const projectConfiguration =
      context.projectsConfigurations.projects[project];
    const sonarKey =
      projectConfiguration.targets['sonar'].options['projectKey'];
    const encodedLoginToken = Buffer.from(`${options.token}:`, 'utf8').toString(
      'base64',
    );
    const headers = { Authorization: `Basic ${encodedLoginToken}` };

    const res = await fetch(
      `${options.host}/api/components/search?qualifiers=TRK&q=${sonarKey}`,
      {
        method: 'GET',
        headers,
      },
    );

    const body = await res.json();

    if (body.components.length === 0) {
      if (!(await createProject({ project, projectConfiguration, sonarKey, options, headers }))) {
        return { success: false };
      }

      if (!(await addTags({ project, projectConfiguration, sonarKey, options, headers }))) {
        return { success: false };
      }

      if (!(await updateDevOpsPlatformIntegration({ project, sonarKey, options, headers }))) {
        return { success: false };
      }
    } else {
      logger.info(`Sonar project ${sonarKey} already exists`);
    }
  }

  return { success: true };
};

async function createProject({ project, projectConfiguration, sonarKey, options, headers }) {
  logger.info(`Creating Sonar project for ${project}`);
  const titleCasedName = projectConfiguration.name
    .replace('-', ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  const name = `DF - Front - ${titleCasedName}`;
  const createProjectResponse = await fetch(
    `${options.host}/api/projects/create?name=${name}&project=${sonarKey}`,
    {
      method: 'POST',
      headers,
    },
  );

  if (isStatusInvalid(createProjectResponse.status)) {
    logger.error(`Failed to create Sonar project for ${project}`);
    return false;
  }

  logger.info(`Sonar project created.`);

  return true;
}

async function addTags({ project, projectConfiguration, sonarKey, options, headers }) {
  const scopes = projectConfiguration.tags
    .find((x) => x.startsWith('scope:'))
    ?.split(':')
    ?.slice(1);

  if (scopes) {
    const tags = ['df', 'front', ...scopes];
    logger.info(`Adding tags : ${tags.join(', ')}`);

    logger.info(`${options.host}/api/project_tags/set?project=${sonarKey}&tags=${tags.join(',')}`)

    const addTagsResponse = await fetch(
      `${options.host}/api/project_tags/set?project=${sonarKey}&tags=${tags.join(',')}`,
      {
        method: 'POST',
        headers,
      },
    );

    if (isStatusInvalid(addTagsResponse.status)) {
      logger.error(`Failed to add tags to Sonar project ${project}`);
      return false;
    }

    logger.info(`Tags added`);
    return true;
  }
}

async function updateDevOpsPlatformIntegration({ project, sonarKey, options, headers }) {
  logger.info('Updating DevOps Platform Integration');

  const updateIntegrationResponse = await fetch(
    `${options.host}/api/alm_settings/set_github_binding?project=${sonarKey}&almSetting=${options.almSettings}&repository=${options.repository}&summaryCommentEnabled=false&monorepo=true`,
    {
      method: 'POST',
      headers,
    },
  );

  if (isStatusInvalid(updateIntegrationResponse.status)) {
    logger.error(`Failed to update DevOps Platform Integration for Sonar project ${project}`);
    return false;
  }

  return true;
}

export default runExecutor;
