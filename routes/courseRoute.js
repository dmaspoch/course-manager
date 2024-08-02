const path = require('path');

const express = require('express');

const courseController = require('../controllers/courseController');
const lectureController = require('../controllers/lectureController');

const router = express.Router();

router.get('/add-course', courseController.addCourse);
router.post('/add-course', courseController.postAddCourse);

router.get('/edit-course/:id', courseController.getEditCourse);
router.post('/edit-course', courseController.postAddCourse);

router.post('/delete-course', courseController.postDeleteCourse);
router.get('/lectures', lectureController.getLectures);

// router.get('/courses', courseController.getCourses);

module.exports = router;
