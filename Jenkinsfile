pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root'
        }
    }

    environment {
        BASE_URL     = credentials('BASE_URL')
        EMAIL        = credentials('EMAIL')
        PASSWORD     = credentials('PASSWORD')
        API_URL      = credentials('API_URL')
        TRELLO_TOKEN = credentials('TRELLO_TOKEN')
        TRELLO_KEY   = credentials('TRELLO_KEY')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test --config=config/playwright.config.ts --grep @smoke'
            }
        }

        stage('Archive report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }
}
