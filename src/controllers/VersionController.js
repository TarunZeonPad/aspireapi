const Response = require('../models/Response');
const path = require("path");
const AppConfigConnection = require('../utils/AppConfigConnection');

const JsonFileLoader = require('../utils/JsonFileLoader');
const AppConfigParamFetchService =  require('../service/AppConfigParamFetchService');

const jsonFileLoader = new JsonFileLoader();
const fullPath = path.resolve("src/conf/aspire_constant.json");
const constantJson = jsonFileLoader.readJsonFile(fullPath);

const appConfigConnection = new AppConfigConnection(constantJson);
const appConfigParamFetchService = new AppConfigParamFetchService(appConfigConnection);

function fetchVersions(req, res) {
  const { tenantId } = req.body;
  console.log(tenantId);
  const params = {
    Application: constantJson.production.application,
    Environment: constantJson.production.environment,
    Configuration: constantJson.production.configuration,
    ClientId: constantJson.production.accessKeyId
  };

  (async () => {
    try {
      const dataResponse = await appConfigParamFetchService.fetchParameter(params);
      const response = new Response(dataResponse.version);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error reading data:', error);
    }
  })();
  
}

module.exports = {
    fetchVersions
};