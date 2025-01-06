pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Étape de construction en cours...'
                // Par exemple : npm run build
            }
        }
        stage('Test') {
            steps {
                echo 'Étape de test en cours...'
                // Par exemple : npm test

                echo 'Pause de 60 secondes...'
                sleep(time: 60, unit: 'SECONDS')
            }
        }
        stage('Deploy') {
            steps {
                echo 'Étape de déploiement en cours...'
                // Par exemple : sh 'make deploy'
            }
        }
    }
}