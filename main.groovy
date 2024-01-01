#!/usr/bin/env groovy

String lastCommitId() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
}

return this
