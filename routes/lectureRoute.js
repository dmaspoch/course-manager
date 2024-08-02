const path = require('path');

const express = require('express');

const courseController = require('../controllers/courseController');
const lectureController = require('../controllers/lectureController');

const router = express.Router();

router.get('/add-lecture/:courseId', lectureController.addLecture);
router.post('/add-lecture', lectureController.postAddLecture);

router.get('/edit-lecture/:lectureId', lectureController.getEditLecture);
router.post('/edit-lecture', lectureController.postAddLecture);

router.post('/delete-lecture', lectureController.postDeleteLecture);
router.get('/lectures/:courseId', lectureController.getLectures);



module.exports = router;
