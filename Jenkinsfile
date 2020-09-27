pipeline {
  agent any
  stages {

    stage('deploy dev') {
      when {
        expression {
          BRANCH_NAME == 'develop'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/StagingServer/front
              git stash
              git pull
              git checkout develop

              yarn
              yarn build
              pm2 restart dev-website
            \'
            '''
      }
    }

    stage('deploy master') {
      when {
        expression {
          BRANCH_NAME == 'master'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/LiverServer/front
              git stash
              git pull
              git checkout master

              yarn
              yarn build:prod
              pm2 restart pro-website
            \'
            '''
      }
    }
  }
}