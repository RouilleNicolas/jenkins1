@Library('csuite-v2-jenkins-lib@master') _

pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes-csuite'
            defaultContainer 'jnlp'
            label "node"
            idleMinutes 30
            instanceCap 3
            yaml libraryResource('podTemplates/angular.yaml')
            retries 2
        }
    }
    
    environment {
        DOCKER_REPO = "gcr.io/sandbox-csuite/csuite/angular-csuitev2"
        DOCKER_TAG = "${env.BRANCH_NAME == 'master' ? 'latest' : env.BRANCH_NAME}"
        DOCKER_TAG_COMMIT = "${env.BRANCH_NAME}-${env.GIT_COMMIT.take(7)}"
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '50'))
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Clean and Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        yarn install --immutable 

                        echo "Workspace content:"
                        ls -la

                    '''
                }
            }
        }

        stage('Sonar Analysis') {
            steps {
                withChecks(name: 'Sonar') {
                    container('sonar-scanner') {
                        //withCredentials([string(credentialsId: 'csuite_sonar_key', variable: 'SONAR_TOKEN')]) {
                        withCredentials([string(credentialsId: 'sonar', variable: 'SONAR_TOKEN')]) {
                            script {
                                try {
                                    def projectSonarKey = "csuite-angular-app-main"
                                    def projectName = "CSuite Angular App"
                                    def projectBranch = env.TAG_NAME != null ? "master" : env.BRANCH_NAME
                                    def projectVersion = env.TAG_NAME != null ? env.TAG_NAME : 'not provided'

                                    // Préparation du rapport ESLint si nécessaire
                                    sh "yarn run lint --format json --output-file report.json || true"

                                    if(env.CHANGE_ID) {
                                        env.SONAR_STDOUT = sh(script: """
                                            NODE_OPTIONS=--max_old_space_size=3072 sonar-scanner \\
                                            -Dsonar.host.url=https://sonar.tools.cooperlsuite.bzh \\
                                            -Dsonar.login=${SONAR_TOKEN} \\
                                            -Dsonar.ws.timeout=120 \\
                                            -Dsonar.language=ts \\
                                            -Dsonar.projectKey=${projectSonarKey} \\
                                            -Dsonar.projectVersion="${projectVersion}" \\
                                            -Dsonar.projectName="${projectName}" \\
                                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \\
                                            -Dsonar.eslint.reportPaths=report.json \\
                                            -Dsonar.qualitygate.wait=true \\
                                            -Dsonar.pullrequest.key=${env.CHANGE_ID} \\
                                            -Dsonar.pullrequest.branch="${env.CHANGE_BRANCH}" \\
                                            -Dsonar.pullrequest.base="${env.CHANGE_TARGET}" \\
                                            -Dsonar.scm.revision=${GIT_COMMIT}
                                        """, returnStdout: true)
                                    } else {
                                        env.SONAR_STDOUT = sh(script: """
                                            NODE_OPTIONS=--max_old_space_size=3072 sonar-scanner \\
                                            -Dsonar.host.url=https://sonar.tools.cooperlsuite.bzh \\
                                            -Dsonar.login=${SONAR_TOKEN} \\
                                            -Dsonar.ws.timeout=120 \\
                                            -Dsonar.language=ts \\
                                            -Dsonar.projectKey=${projectSonarKey} \\
                                            -Dsonar.projectVersion="${projectVersion}" \\
                                            -Dsonar.projectName="${projectName}" \\
                                            -Dsonar.branch.name="${projectBranch}" \\
                                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \\
                                            -Dsonar.eslint.reportPaths=report.json \\
                                            -Dsonar.qualitygate.wait=true
                                        """, returnStdout: true)
                                    }
                                } catch (err) {
                                    currentBuild.result = 'UNSTABLE'
                                    throw err
                                }
                            }
                        }
                    }
                }
            }
            post {
                always {
                    publishChecks name: 'Sonar', title: 'Sonarqube', detailsURL: "https://sonar.tools.cooperlsuite.bzh/dashboard?id=${projectSonarKey}&pullRequest=${env.CHANGE_ID}", text: "${env.SONAR_STDOUT}"
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''

                        echo "Workspace content:"
                        ls -la

                        echo "Building Angular application..."
                        nx build farming-suite-web --configuration=production --skip-nx-cache --verbose
                    '''
                }
            }
        }

        stage('Build and push Image Docker') {
            steps {
                container('kaniko') {
                    sh """
                        echo "Building and pushing Docker image with Kaniko..."
                        /kaniko/executor --context=${WORKSPACE} \
                            --dockerfile=${WORKSPACE}/Dockerfile \
                            --destination=${DOCKER_REPO}:${DOCKER_TAG} \
                            --destination=${DOCKER_REPO}:${DOCKER_TAG_COMMIT} \
                            --cache=true \
                            --cache-ttl=24h
                    """
                }
            }
        }

    }

    post {
        always {
            deleteDir()
        }
        success {
            echo "Build and push successful! Image available at ${DOCKER_REPO}:${DOCKER_TAG}"
        }
    }

}
