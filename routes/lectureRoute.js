const path = require('path');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

const courseController = require('../controllers/courseController');
const lectureController = require('../controllers/lectureController');

const router = express.Router();

router.get('/add-lecture/:courseId', lectureController.addLecture);
router.post('/add-lecture', lectureController.postAddLecture);

router.get('/edit-lecture/:lectureId', lectureController.getEditLecture);
router.post('/edit-lecture', lectureController.postAddLecture);

router.post('/delete-lecture', lectureController.postDeleteLecture);
router.get('/lectures/:courseId', lectureController.getLectures);

router.post('/upload', upload.single('lecture'), (req, res) => {
    // req.file contains the uploaded file
    // req.body contains the entire request body
    const fileName = req.file.originalname;
    // Save the file name to your database or a variable
    res.send(`File uploaded successfully! ${fileName}`);
  });



module.exports = router;
