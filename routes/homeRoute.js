const path = require('path');

const express = require('express');

const homeController = require('../controllers/home');
const courseController = require('../controllers/course');

const router = express.Router();

router.get('/', homeController.getCreateHome);
router.get('/courses', courseController.getCourses);


module.exports = router;
