const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Import and use API routes
const versionRoutes = require('./src/routes/VersionRoutes');
app.use('/api/aspire/fetch-version', versionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));