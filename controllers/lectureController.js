const Lecture = require("../models/lecture");
const Course = require("../models/course");
const Assistant = require("../assistant");

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

exports.getSummary = async (req, res, next) => {
  const lectureId = req.params.lectureId;
  const data = await Lecture.findByPk(lectureId);
  const lecture = data.toJSON();
  res.render("./summary", {
    lecture: lecture,
    pageTitle: lecture.name + " :Summary",
    body: lecture.summary
  });
}

exports.postAddLecture = async (req, res, next) => {
  const courseId = req.body.courseId;
  const lectureId = req.body.lectureId;
  console.log("Course ID: " + courseId);
  if (lectureId) {
    await Lecture.update(req.body, { where: { id: lectureId } });
  } else {
    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      const fileId = await Assistant.uploadFileToVectorStore(process.env.ASSISTANT_ID, process.env.VECTOR_STORE_ID, req.file.path);
      const summary = await Assistant.summarize(process.env.ASSISTANT_ID);
      const lecture = await course.createLecture({
        name: req.body.name,
        date: req.body.date,
        summary: summary
      });
      await lecture.save();
      await Assistant.deleteFileFromVectorStore(process.env.VECTOR_STORE_ID, fileId);
    } catch (err) {
      console.log(err);
    }
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