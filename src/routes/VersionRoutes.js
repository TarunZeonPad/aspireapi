const express = require('express');
const router = express.Router();
const versionController = require('../controllers/VersionController');
const authorize = require('../authorization/Authorization.js');

router.post('/', authorize, versionController.fetchVersions);

module.exports = router;
