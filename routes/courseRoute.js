const path = require('path');

const express = require('express');

const courseController = require('../controllers/course');

const router = express.Router();

router.get('/add-course', courseController.addCourse);
router.post('/add-course', courseController.postAddCourse);

module.exports = router;
