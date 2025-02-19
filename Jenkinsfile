@Library('csuite-v2-jenkins-lib@master') _

pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes-csuite'
            defaultContainer 'jnlp'
            label "node"
            idleMinutes 30
            instanceCap 3
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: docker.io/library/node:20.11.1-slim@sha256:f3299f16246c71ab8b304c3e12b29905a45e432ffa2355a54aca3e56195a8e92
    command:
    - cat
    tty: true
    imagePullPolicy: Always
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command:
    - cat
    tty: true
    volumeMounts:
    - name: jenkins-docker-cfg
      mountPath: /kaniko/.docker
  - name: crane
    image: gcr.io/go-containerregistry/crane:debug
    command:
    - cat
    tty: true
  volumes:
  - name: jenkins-docker-cfg
    secret:
      secretName: docker-credentials
      items:
        - key: .dockerconfigjson
          path: config.json
'''
            retries 2
        }
    }
    
    environment {
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
        stage('Check Node Version') {
            steps {
                container('node') {
                    sh '''
                        NODE_VERSION=$(node --version)
                        echo "Node.js version: $NODE_VERSION"
                        if [[ "$NODE_VERSION" != "v20.11.1" ]]; then
                            echo "Error: Expected Node.js v20.11.1 but got $NODE_VERSION"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        yarn install --frozen-lockfile || {
                            echo "Lockfile needs updating, running normal install..."
                            yarn install
                            echo "WARNING: yarn.lock has been updated and should be committed to the repository"
                        }
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                container('node') {
                    sh '''
                        echo "Building Angular application..."
                        yarn nx build farming-suite-web --configuration=production
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
