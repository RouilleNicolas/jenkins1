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
                        
                        # 2. Nettoyer le JSON en préservant la clé privée
                        echo "2. Nettoyage du JSON..."
                        # Extraire la clé privée
                        BEGIN_LINE=\$(grep -n "BEGIN PRIVATE KEY" \${CREDS_FILE} | cut -d: -f1)
                        END_LINE=\$(grep -n "END PRIVATE KEY" \${CREDS_FILE} | cut -d: -f1)
                        
                        # Créer le JSON propre
                        echo "{" > /tmp/clean_creds.json
                        # Ajouter le début du fichier (avant la clé privée) sans retours à la ligne
                        head -n \$((BEGIN_LINE-1)) \${CREDS_FILE} | tr -d '\\n' | tr -d '\\r' >> /tmp/clean_creds.json
                        # Ajouter la clé privée avec ses retours à la ligne
                        echo "" >> /tmp/clean_creds.json
                        sed -n "\${BEGIN_LINE},\${END_LINE}p" \${CREDS_FILE} >> /tmp/clean_creds.json
                        # Ajouter la fin du fichier sans retours à la ligne
                        tail -n +\$((END_LINE+1)) \${CREDS_FILE} | tr -d '\\n' | tr -d '\\r' >> /tmp/clean_creds.json
                        
                        # 3. Vérifier le résultat
                        echo "3. Vérification du fichier nettoyé..."
                        cat /tmp/clean_creds.json
                        
                        # 4. Utiliser le fichier nettoyé
                        echo "4. Exécution de gcrane avec le fichier nettoyé..."
                        GOOGLE_APPLICATION_CREDENTIALS=/tmp/clean_creds.json /ko-app/gcrane ls ${DOCKER_REPO}
                        
                        # 5. Nettoyer
                        rm -f /tmp/clean_creds.json
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
