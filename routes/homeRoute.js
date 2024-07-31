const path = require('path');

const express = require('express');

const homeController = require('../controllers/homeController');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/', homeController.getCreateHome);
router.get('/courses', courseController.getCourses);


module.exports = router;
