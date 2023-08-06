class AppConfigParamFetchService {

    constructor(appConfigConnection) {
        this.appconfig = appConfigConnection.appconfig;
      }

    
      async fetchParameter(params) {
        let jsonResponse;
        return new Promise((resolve, reject) => {
             this.appconfig.getConfiguration(params, (err, data) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                const decodedContent = Buffer.from(data.Content, 'base64').toString('utf-8');
                jsonResponse = JSON.parse(decodedContent);
                resolve(jsonResponse);
              }
            });
            
          });
      }          
}


module.exports = AppConfigParamFetchService;