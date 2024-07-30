const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Course = sequelize.define("course", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prof: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  credits: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Course;