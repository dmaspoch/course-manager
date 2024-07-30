const Course = require("../models/course");

exports.getCreateCourse = (req, res, next) => {
  res.render("./course", {
    pageTitle: "Home",
    bodyText: "Placeholder text",
  });
};

exports.addCourse = (req, res, next) => {
  console.log("Get request");
  res.render("./add-course", {
    pageTitle: "Add Course",
    editing: false
  });
};

exports.postAddCourse = async (req, res, next) => {
  const course = {
    name: req.body.name,
    prof: req.body.prof,
    duration: req.body.duration,
    credits: req.body.credits
  };
  await Course.create(course);
  const courses = await Course.findAll({raw: true});
  console.log(courses);
  res.render('./courses', {
    pageTitle: "Course Information",
    courses: courses
  });

}
