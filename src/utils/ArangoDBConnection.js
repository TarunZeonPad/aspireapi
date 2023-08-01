const arangojs = require('arangojs');

class ArangoDBConnection {
  constructor() { 
    this.docClient = new arangojs.Database({
        url: 'http://172.31.34.233:8529',
        databaseName: 'msidb'
    });
    this.docClient.useBasicAuth('root', 'welcome*123');
  }
}

module.exports = ArangoDBConnection;