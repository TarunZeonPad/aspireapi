const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Import and use API routes
const versionRoutes = require('./src/routes/VersionRoutes');
const fileRoutes = require('./src/routes/FileRouters');
const JsonFileLoader = require('./src/utils/JsonFileLoader');

const jsonFileLoader = new JsonFileLoader();

const endpointJson = jsonFileLoader.readJsonFile('./src/conf/aspire_urlmapenvironment.json');
app.use(endpointJson.production.fetchVersion, versionRoutes);
app.use(endpointJson.production.fetchFile, fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));