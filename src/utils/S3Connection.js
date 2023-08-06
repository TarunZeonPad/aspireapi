const AWS = require('aws-sdk');

class S3Connection {
    constructor(constantJson) { 
    const awsConfig = {
        region: constantJson.production.region,
        accessKeyId: constantJson.production.accessKeyId,
        secretAccessKey: constantJson.production.secretAccessKey,
    };

    this.s3 = new AWS.S3(awsConfig);
    }
}

module.exports = S3Connection;


