const AWS = require('aws-sdk');

class AppConfigConnection {
    constructor(constantJson) { 
    const awsConfig = {
        region: constantJson.production.region,
        accessKeyId: constantJson.production.accessKeyId,
        secretAccessKey: constantJson.production.secretAccessKey,
    };

    AWS.config.update(awsConfig);
    this.appconfig = new AWS.AppConfig();
    }
}

module.exports = AppConfigConnection;