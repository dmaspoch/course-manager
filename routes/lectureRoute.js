const path = require('path');
const express = require('express');

// Multer is middleware for handling multipart/form-data , which is primarily used for uploading files
const multer = require('multer');

// Sets a destination directory for uploaded files
// const upload = multer({ dest: './uploads/' });
const storage = multer.diskStorage({
    dest: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage});

const courseController = require('../controllers/courseController');
const lectureController = require('../controllers/lectureController');

const router = express.Router();

router.get('/add-lecture/:courseId', lectureController.addLecture);
router.post('/add-lecture', upload.single('lecture'), lectureController.postAddLecture);

router.get('/summary/:lectureId', lectureController.getSummary);

router.get('/edit-lecture/:lectureId', lectureController.getEditLecture);
router.post('/edit-lecture', lectureController.postAddLecture);

router.post('/delete-lecture', lectureController.postDeleteLecture);
router.get('/lectures/:courseId', lectureController.getLectures);

// .single returns middleware that processes a single file associated with the given form field ('lecture')
// router.post('/upload', upload.single('lecture'), method)



module.exports = router;
