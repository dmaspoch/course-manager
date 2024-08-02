const Course = require("../models/course");

exports.getCreateCourse = (req, res, next) => {
  res.render("./course", {
    pageTitle: "Home",
    bodyText: "Placeholder text",
  });
};

exports.addCourse = (req, res, next) => {
  res.render("./add-course", {
    pageTitle: "Add Course",
    path: '/add-product',
    editing: false
  });
};

exports.getEditCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const data = await Course.findByPk(courseId);
  const course = data.toJSON();
  res.render("./add-course", {
    pageTitle: "Edit Course",
    path: '/edit-product',
    course: course,
    editing: true
  });
}

exports.postAddCourse = async (req, res, next) => {
  const courseId = req.body.courseId; // Get the course ID from the form
  if (courseId) { // If a course ID is present, update the course
    await Course.update(req.body, { where: { id: courseId } });
  } else { // Otherwise, create a new course
    const course = {
      name: req.body.name,
      prof: req.body.prof,
      duration: req.body.duration,
      credits: req.body.credits
    };
    await Course.create(course);
  }
  res.redirect('/courses');
};


exports.postDeleteCourse = async(req, res, next) => {
  const courseId = req.body.id;
  const data = await Course.findByPk(courseId);
  const course = data.toJSON();
  data.destroy();
  res.redirect('/courses');
};

exports.getCourses = async (req, res, next) => {
  const courses = await Course.findAll({ raw: true });
  res.render('./courses', {
    pageTitle: "Course Information",
    courses: courses
  });
}