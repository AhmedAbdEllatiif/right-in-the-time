
@library ('jenkins-shared-library')

// the commit id is the current image version
def IMAGE_TAG 

// image name 
def IMAGE_NAME = "ahmedmohamed1993/right-in-the-time"


pipeline{
    
    agent any 

    tools {
        nodejs "Node 21.5.0"
    }

    stages{


        // Init the image tag
        stage("Init image tag") {
            steps{
                script {
                    IMAGE_TAG = load ("main.groovy").lastCommitId()
                }
            }
        }


        // Install dependencies
        stage("Install Dependencies"){
            steps{
                script {
                    sh 'npm install'
                }
            }
        }

        // Test 
        stage("Test App"){
            steps{
                script {
                    sh 'npm test'
                }
            }
        }
        
        // Run 
        stage("Run the app"){
            steps{
                script {
                    sh '''
                        node app.js & sleep 1
                        echo $! > .pidfile
                        kill $(cat .pidfile)
                        '''
                }
            }
        }

        // Build the docker image
        stage("Build Docker Image"){
            when{
                expression {
                    BRANCH_NAME == "master"
                }
            }
            steps{
                script {
                   buildImage "${IMAGE_NAME}" "${IMAGE_TAG}"
                }
            }
        }

        // Push the image to dockerhub
        stage("Push the Image to the registry"){
            when{
                expression {
                    BRANCH_NAME == "master"
                }
            }
            steps{
                script {
                    dockerLogin()
                
                    dockerPush "${IMAGE_NAME}" "${IMAGE_TAG}"
                }
            }

            post{
                always{
                    echo "Will Delete the image ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

    }

}
