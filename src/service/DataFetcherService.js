class DataFetcherService {
    constructor(arangoDBConnection) {
      this.docClient = arangoDBConnection.docClient;
    }
  
    async readData(collectionName) {
        return new Promise(async (resolve, reject) => {
          const collection = this.docClient.collection(collectionName);
          const dataResponse = [];
    
          await collection.all().then(
            cursor => cursor.all()
          ).then(
            documents => documents.forEach(document => 
              { 
              let obj = {versionName:document.versionNum,email:document.createdBy,description:document.description,status:document.status};
              console.log("Inside document");
              console.log(obj);
              dataResponse.push(obj);
          }),
            err => console.error('Failed to fetch:', err)
          );
    
         
    
          resolve(dataResponse);
        });
      }
    
    
      async  readDataFromArango(collectionName) {
        return new Promise(async (resolve, reject) => {
          // Get a reference to the collection
          const collection = db.collection('msi_s3_store');
          const dataResponse = [];
    
          await collection.all().then(
            cursor => cursor.all()
          ).then(
            documents => documents.forEach(document => 
              { 
              //let obj = {versionName:document.versionNum,email:document.createdBy,description:document.description,status:document.status};
              //console.log("Inside document");
              //console.log(obj);
              dataResponse.push(document);
          }),
            err => console.error('Failed to fetch:', err)
          );
    
         
    
          resolve(dataResponse);
        });
      }
      
  }
  
  module.exports = DataFetcherService;