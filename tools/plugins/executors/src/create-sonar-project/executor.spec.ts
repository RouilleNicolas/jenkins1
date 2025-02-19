import { ExecutorContext } from '@nx/devkit';
import executor from './executor';
import { CreateSonarProjectExecutorSchema } from './schema';

jest.mock('node:child_process', () => {
  return {
    execSync: () => 'my-project\n',
  };
});

global.fetch = jest.fn();

const options: CreateSonarProjectExecutorSchema = {
  host: 'http://localhost:9000',
  token: 'un_token',
  repository: 'a_repository',
  almSettings: 'an_alm_settings',
};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {
      'my-project': {
        root: 'apps/my-project',
        name: 'my-project',
        targets: {
          sonar: {
            options: {
              projectKey: 'my-project-key',
            },
          },
        },
        tags: ['scope:test'],
      },
    },
    version: 2,
  },
  nxJsonConfiguration: {},
};

describe('CreateSonarProject Executor', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    console.warn = jest.fn();
    console.info = jest.fn();
    console.error = jest.fn();
  });

  it('can run', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ components: [] }),
        status: 200,
      })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 });

    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });

  it('creates a Sonar project if it does not exist', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ components: [] }),
        status: 200,
      })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 });

    const output = await executor(options, context);
    expect(output.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/components/search?qualifiers=TRK&q=my-project-key',
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/projects/create?name=DF - Front - My Project&project=my-project-key',
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/project_tags/set?project=my-project-key&tags=df,front,test',
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/alm_settings/set_github_binding?project=my-project-key&almSetting=an_alm_settings&repository=a_repository&summaryCommentEnabled=false&monorepo=true',
      expect.any(Object)
    );
  });

  it('does not create a Sonar project if it exists', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ components: [{}] }),
      status: 200,
    });

    const output = await executor(options, context);
    expect(output.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/components/search?qualifiers=TRK&q=my-project-key',
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fails if creating a Sonar project fails', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ components: [] }),
        status: 200,
      })
      .mockResolvedValueOnce({ status: 500 });

    const output = await executor(options, context);
    expect(output.success).toBe(false);
  });

  it('fails if adding tags fails', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ components: [] }),
        status: 200,
      })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 500 });

    const output = await executor(options, context);
    expect(output.success).toBe(false);
  });

  it('fails if updating DevOps Platform Integration fails', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ components: [] }),
        status: 200,
      })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 500 });

    const output = await executor(options, context);
    expect(output.success).toBe(false);
  });
});
