const Lecture = require("../models/lecture");
const Course = require("../models/course");

exports.addLecture = (req, res, next) => {
  res.render("./add-lecture", {
    pageTitle: "Add Lecture",
    editing: false,
    courseId: req.params.courseId
  });
};

exports.getEditLecture = async (req, res, next) => {
  const lectureId = req.params.lectureId;
  const data = await Lecture.findByPk(lectureId);
  const lecture = data.toJSON();
  res.render("./add-lecture", {
    pageTitle: "Edit Lecture",
    lecture: lecture,
    editing: true
  });
}

exports.postAddLecture = async (req, res, next) => {
  const courseId = req.body.courseId;
  const lectureId = req.body.lectureId;
  console.log("Course ID: " + courseId);
  if (lectureId) {
    await Lecture.update(req.body, { where: { id: lectureId } });
  } else {
    const lecture = {
      name: req.body.name,
      date: req.body.date,
      courseId: courseId
    };
    await Lecture.create(lecture);

  }
  res.redirect('/lectures/' + courseId);
};

exports.getLectures = async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findOne({ where: { id: courseId } });
  const lectures = await Lecture.findAll({ raw: true, where: { courseId: courseId } });
  res.render('./lectures', {
    pageTitle: "Lectures",
    lectures: lectures,
    name: course.name,
    courseId: courseId
  });
}


exports.postDeleteLecture = async (req, res, next) => {
  const lectureId = req.body.id;
  const data = await Lecture.findByPk(lectureId);
  const lecture = data.toJSON();
  const courseId = lecture.courseId;
  data.destroy();
  res.redirect('/lectures/' + courseId);
};

// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// exports.uploadLecture = upload.single('file');

// exports.postUploadLecture = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.send(`File uploaded successfully: ${req.file.originalname}`);
// };