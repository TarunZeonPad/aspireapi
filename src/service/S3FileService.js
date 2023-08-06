const csv = require('csv-parser');
const { promisify } = require('util');
const Readable = require('stream').Readable;


class S3FileService {

    constructor(s3Connection) {
        this.s3 = s3Connection.s3;
      }

    async fetchFile(params) {
        const getObjectAsync = promisify(this.s3.getObject).bind(this.s3);
        try {
            const data = await getObjectAsync(params);
            const csvContent = data.Body.toString();
            console.log('File Content:\n', csvContent);

            const results = await new Promise((resolve) => {
            const results = [];
            const csvStream = new Readable({
                read() {
                    this.push(csvContent);
                    this.push(null);
                },
            });

            csvStream
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                console.log('CSV data:', results);
                resolve(results);
            });
            });

            return results;
        } catch (error) {
            console.log(error);
            throw error;
         }
}

      
      
}


module.exports = S3FileService;



