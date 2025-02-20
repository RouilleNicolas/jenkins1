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
        HUSKY = "0"
        NODE_ENV = "development"
        LMDB_FORCE_NO_ASSERTIONS = "1"
        DOCKER_REPO = "gcr.io/sandbox-csuite/csuite/angular-csuitev2"
        DOCKER_TAG = "${env.BRANCH_NAME == 'master' ? 'latest' : env.BRANCH_NAME}"
        DOCKER_TAG_COMMIT = "${env.BRANCH_NAME}-${env.GIT_COMMIT.take(7)}"
        APP_WORKSPACE = "farming-suite-web"
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
                        echo "Cleaning caches..."
                        rm -rf .nx || true
                        rm -rf node_modules/.cache || true
                        
                        echo "Installing dependencies..."
                        yarn install --immutable 
                        
                    '''
                }
            }
        }

        stage('Verify Environment') {
            steps {
                container('node') {
                    sh '''
                        echo "Node version: $(node --version)"
                        echo "Yarn version: $(yarn --version)"
                        echo "Angular CLI version:"
                        yarn ng version
                        echo "Nx version:"
                        yarn nx --version
                        
                        echo "Workspace content:"
                        ls -la
                        
                        # Vérifier la configuration Nx
                        echo "Nx configuration:"
                        cat nx.json || echo "nx.json not found"
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''
                        echo "Building Angular application..."
                        yarn nx reset  # Reset Nx cache
                        nx build farming-suite-web --configuration=production --skip-nx-cache --verbose
                    '''
                }
            }
        }

        stage('Build Docker Image') {
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
