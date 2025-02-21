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
                        echo "Installing dependencies..."
                        yarn install --immutable 

                        echo "Workspace content:"
                        ls -la

                    '''
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

        stage('Verify Image') {
            steps {
                container('crane') {
                    sh """
                        echo "Verifying pushed images with gcrane ..."
                        CREDS_FILE="/home/jenkins/.config/gcloud/application_default_credentials.json"
                        
                        # 1. Vérifier l'existence du fichier
                        echo "1. Vérification de l'existence du fichier credentials..."
                        ls -la \${CREDS_FILE}
                        
                        # 2. Afficher les premiers caractères pour vérifier s'il y a des caractères spéciaux
                        echo "2. Premiers caractères du fichier (recherche de caractères spéciaux)..."
                        head -1 \${CREDS_FILE} | xxd
                        
                        # 3. Vérifier le type de fichier
                        echo "3. Type de fichier..."
                        file \${CREDS_FILE}
                        
                        # 4. Vérifier les permissions
                        echo "4. Permissions du fichier..."
                        stat \${CREDS_FILE}
                        
                        # 5. Tenter de parser le JSON
                        echo "5. Tentative de parsing JSON..."
                        cat \${CREDS_FILE}
                        
                        echo "6. Exécution de gcrane..."
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
