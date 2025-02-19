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
        stage('Test Node Container') {
            steps {
                container('node') {
                    sh '''
                        echo "Testing Node container..."
                        node --version
                        npm --version
                        yarn --version
                    '''
                }
            }
        }

        stage('Test Sonar Scanner') {
            steps {
                container('sonar-scanner') {
                    sh '''
                        echo "Testing Sonar Scanner container..."
                        sonar-scanner --version
                    '''
                }
            }
        }

        stage('Test Kaniko') {
            steps {
                container('kaniko') {
                    sh '''
                        echo "Testing Kaniko container..."
                        /kaniko/executor version
                    '''
                }
            }
        }

        stage('Test Crane') {
            steps {
                container('crane') {
                    sh '''
                        echo "Testing Crane container..."
                        /ko-app/gcrane version || true
                    '''
                }
            }
        }

        stage('Test Gcloud-Kubectl') {
            steps {
                container('gcloud-kubectl') {
                    sh '''
                        echo "Testing Gcloud-Kubectl container..."
                        kubectl version --client
                        gcloud version
                    '''
                }
            }
        }

        stage('Test Workspace') {
            steps {
                container('node') {
                    sh '''
                        echo "Testing workspace permissions..."
                        mkdir -p test-angular
                        cd test-angular
                        echo "console.log('test')" > test.js
                        node test.js
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        yarn install
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''
                        echo "Building Angular application..."
                        npx nx run farming-suite-web:build
                    '''
                }
            }
        }

        stage('Build and Push Docker Image') {
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

        stage('Verify Image') {
            steps {
                container('crane') {
                    sh """
                        echo "Verifying pushed images..."
                        /ko-app/gcrane ls ${DOCKER_REPO}
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
