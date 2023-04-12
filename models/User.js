const Sequelize = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define("user", {
    name: Sequelize.STRING,
    age: Sequelize.NUMBER
})

module.exports = { User };