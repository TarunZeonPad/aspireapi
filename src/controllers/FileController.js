const Response = require('../models/Response');
const path = require("path");
const S3Connection = require('../utils/S3Connection');
const JsonFileLoader = require('../utils/JsonFileLoader');
const AppConfigConnection = require('../utils/AppConfigConnection');
const AppConfigParamFetchService =  require('../service/AppConfigParamFetchService');
const S3FileService =  require('../service/S3FileService');
const ArangoDBConnection =  require('../utils/ArangoDBConnection');
const ArangoDBService =  require('../service/ArangoDBService');

const jsonFileLoader = new JsonFileLoader();
const fullPath = path.resolve("src/conf/aspire_constant.json");
const constantJson = jsonFileLoader.readJsonFile(fullPath);

const s3Connection = new S3Connection(constantJson);
const s3FileService = new S3FileService(s3Connection);

const appConfigConnection = new AppConfigConnection(constantJson);
const appConfigParamFetchService = new AppConfigParamFetchService(appConfigConnection);

function fetchFileFromS3(req, res) {
  const { tenantId, fileName } = req.body;
  console.log(tenantId);
  console.log(fileName);

  const systemParams = {
    Application: constantJson.production.application,
    Environment: constantJson.production.environment,
    Configuration: tenantId+"/"+constantJson.production.system_details,
    ClientId: constantJson.production.accessKeyId
  };

  (async () => {
    try {
      const dataResponse = await appConfigParamFetchService.fetchParameter(systemParams);
      //console.log(dataResponse);
      const params = {
        Bucket:dataResponse.s3_bucket_name,
        Key:fileName
      };
      const dataResponseForS3 = await s3FileService.fetchFile(params);

      const arangoDBConnection = new ArangoDBConnection(dataResponse);
      const arangoDBService =  new ArangoDBService(arangoDBConnection);
      console.log(constantJson);
      const insertReponse = await arangoDBService.insertData(constantJson.production.msi_s3_store,dataResponseForS3);
      console.log(insertReponse);
      res.status(201).json("Successfully inserted into ArangoDB");

    } catch (error) {
      console.error('Error while performing operation:', error);
    }
  })();
}

module.exports = {
    fetchFileFromS3
};