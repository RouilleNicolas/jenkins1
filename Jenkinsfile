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
                        echo "Workspace content:"
                        ls -la
                        echo "Package.json content:"
                        cat package.json
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        # Ignorer les avertissements de lmdb qui n'affectent pas le fonctionnement
                        yarn install --immutable 2>&1 | grep -v "warning.*lmdb" || true
                        
                        echo "Verifying node_modules:"
                        ls -la node_modules/@nx || echo "No @nx directory found"
                        ls -la node_modules/@angular || echo "No @angular directory found"
                        
                        echo "Checking nx.json:"
                        cat nx.json || echo "No nx.json found"
                        
                        # Vérifier que nx est disponible
                        echo "Nx binaries:"
                        ls -la node_modules/.bin/nx* || echo "No nx binaries found"
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''
                        echo "Building Angular application..."
                        echo "Current directory: $(pwd)"
                        echo "Directory content:"
                        ls -la
                        
                        # Utiliser yarn pour exécuter nx
                        echo "Running nx build..."
                        yarn nx run farming-suite-web:build --configuration=production
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
