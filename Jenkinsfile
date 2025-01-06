pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Étape de construction en cours...'
                // Ici, vous pouvez ajouter les commandes pour compiler votre projet
                // Par exemple : npm run build
            }
        }
        stage('Test') {
            steps {
                echo 'Étape de test en cours...'
                // Ici, vous pouvez ajouter les commandes pour tester votre projet
                // Par exemple : npm test
            }
        }
        stage('Deploy') {
            steps {
                echo 'Étape de déploiement en cours...'
                // Ici, vous pouvez ajouter les commandes pour déployer votre projet
                // Par exemple : sh 'make deploy'
            }
        }
    }
}