const arangojs = require('arangojs');

class ArangoDBConnection {
  constructor(dataResponse) { 
    this.docClient = new arangojs.Database({
        url: dataResponse.database_url,
        databaseName: dataResponse.database_name
    });
    this.docClient.useBasicAuth(dataResponse.database_username, dataResponse.database_password);
  }
}

module.exports = ArangoDBConnection;