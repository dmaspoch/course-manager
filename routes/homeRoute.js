const path = require('path');

const express = require('express');

const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', homeController.getCreateHome);


module.exports = router;
