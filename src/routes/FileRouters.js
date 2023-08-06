const express = require('express');
const router = express.Router();
const fileController = require('../controllers/FileController');
const authorize = require('../authorization/Authorization.js');

router.post('/', authorize, fileController.fetchFileFromS3);

module.exports = router;