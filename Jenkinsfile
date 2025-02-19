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
                        /kaniko/executor --version
                    '''
                }
            }
        }

        stage('Test Crane') {
            steps {
                container('crane') {
                    sh '''
                        echo "Testing Crane container..."
                        /ko-app/gcrane version
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
    }

    post {
        always {
            cleanWs()
        }
    }
}
