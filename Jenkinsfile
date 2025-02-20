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
        stage('Setup Environment') {
            steps {
                container('node') {
                    sh '''
                        echo "Node.js version: $(node --version)"
                        
                        # Configuration de Yarn via corepack
                        corepack enable
                        corepack prepare yarn@4.4.0 --activate
                        
                        echo "Yarn version: $(yarn --version)"
                        
                        # Installer les dépendances Nx et Angular
                        yarn add -D @nx/workspace @nx/angular @angular/cli nx
                        
                        # Vérifier l'installation de Nx et ses plugins
                        echo "Nx installation:"
                        yarn nx --version
                        
                        echo "Nx Angular plugin:"
                        yarn list @nx/angular
                        
                        # Vérifier la configuration Nx
                        echo "Nx configuration:"
                        cat nx.json || echo "nx.json not found"
                        
                        echo "Workspace content:"
                        ls -la
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        yarn install --immutable 2>&1 | grep -v "warning.*lmdb" || true
                        
                        echo "Verifying Angular installation v2:"
                        yarn ng version
                        
                        echo "Verifying Nx workspace:"
                        yarn nx list @nx/angular
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''
                        echo "Building Angular application..."
                        echo "Project configuration:"
                        cat apps/farming-suite-web/project.json || echo "project.json not found"
                        
                        # Utiliser yarn nx avec le plugin Angular
                        echo "Running nx build..."
                        yarn nx build farming-suite-web --configuration=production --skip-nx-cache
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
