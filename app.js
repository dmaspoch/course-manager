const env = require("dotenv").config();
const sequelize = require("./util/database");
const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const courseController = require("./controllers/courseController");
const bodyParser = require('body-parser');

const Course = require("./models/course");
const User = require("./models/user");

const courseRoute = require('./routes/courseRoute');
const homeRoute = require('./routes/homeRoute');

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

// app.use(fitnessRoutes);
// app.use(errorController.get404);

// Plan.belongsTo(Profile);
// Profile.hasOne(Plan);

// Plan.hasMany(Session);
// Session.belongsTo(Plan);

// Session.hasMany(Exercise);
// Exercise.belongsTo(Session);

sequelize
  .sync()
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