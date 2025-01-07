@Library('csuite-v2-jenkins-lib@master') _

pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes-csuite'
            label 'jenkins-builder'
            yaml libraryResource('podTemplates/java-openjdk21.yaml')
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '50'))
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Build') {
            steps {
                container('openjdk') {
                    echo 'Étape de construction en cours...'
                    echo 'Exécution de la construction avec l’image OpenJDK 21.'
                    // Par exemple : sh './gradlew build'
                }
            }
        }
        stage('Test') {
            steps {
                container('openjdk') {
                    echo 'Étape de test en cours...'
                    echo 'Exécution des tests avec l’image OpenJDK 21.'
                    // Par exemple : sh './gradlew test'
                    sh 'mkdir -p logs' 
                }
            }
        }
        stage('Crane') {
            steps {
                container('crane') {
                    echo 'Étape utilisant le conteneur Crane...'
                    echo 'Crane peut être utilisé pour gérer les images container, par exemple pour des validations ou transferts.'
                    // Par exemple : sh 'crane ls <image>'
                }
            }
        }
        stage('Pause') {
            steps {
                echo 'Pause de 60 secondes avant de continuer...'
                sleep(time: 60, unit: 'SECONDS')
            }
        }
    }

    // post {
    //     always {
    //         echo 'Nettoyage du workspace...'
    //         script {
    //             // Exécution dans le contexte d'un agent
    //             node {
    //                 deleteDir()
    //             }
    //         }
    //     }
    // }

}
