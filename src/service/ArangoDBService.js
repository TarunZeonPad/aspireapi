class ArangoDBService {
    constructor(arangoDBConnection) {
      this.docClient = arangoDBConnection.docClient;
    }
  
    async insertData(collectionName, results) {
        return new Promise((resolve, reject) => {
          console.log('Inside insertData',collectionName);
          const collection = this.docClient.collection(collectionName);
          const result =  collection.save(results);
          resolve(result);
        });
      }
    
  }
  
  module.exports = ArangoDBService;