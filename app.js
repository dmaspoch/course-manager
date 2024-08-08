const env = require("dotenv").config();
const sequelize = require("./util/database");
const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const courseController = require("./controllers/courseController");
const bodyParser = require('body-parser');

const Course = require("./models/course");
const User = require("./models/user");
const Lecture = require("./models/lecture");

const courseRoute = require('./routes/courseRoute');
const homeRoute = require('./routes/homeRoute');
const lectureRoute = require('./routes/lectureRoute');


if (env.error) {
  throw new Error("Failed to load .env file");
}

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "views",
  })
);
app.set("view engine", "hbs");
app.set("views, views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware function to store the user in the request
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(homeRoute);
app.use(courseRoute);
app.use(lectureRoute);

Course.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Course);
Course.hasMany(Lecture);
Lecture.belongsTo(Course);

// force:true forces any changes made to the table (i.e. extra fields)
sequelize
  .sync(/*{force: true}*/)
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
       name: 'Daniel Maspoch',
       year: 2,
       age: 20
      });
    }
    return user;
  })
  // .then(profile => profile.createPlan())
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));