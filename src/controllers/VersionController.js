const Response = require('../models/Response');
const ArangoDBConnection = require('../utils/ArangoDBConnection');
const DataFetcherService = require('../service/DataFetcherService');

const arangoDBConnection = new ArangoDBConnection();
const dataFetcherService = new DataFetcherService(arangoDBConnection);

function fetchVersions(req, res) {
  // Read the tenantId from the request body
  const { tenantId } = req.body;

  dataFetcherService.readData("msiVersionCollection")
  .then(dataResponse => {
    console.log('Retrieved data array:');
    console.log(dataResponse);
    const response = new Response('1.0', 'Admin', new Date());
    res.status(201).json(response);
  })
  .catch(error => {
    console.error('Error reading data:', error);
  })
  .finally(() => {
    // Close the ArangoDB connection
    //db.close();
  });
  // Assuming tenantId is valid, create a new response object
  
}

module.exports = {
    fetchVersions,
};