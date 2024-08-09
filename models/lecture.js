const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Lecture = sequelize.define("lecture", {
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
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  summary: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  }
});

module.exports = Lecture;