const Sequelize = require("sequelize");
const { sequelize } = require("../db");

const Fruit = sequelize.define("fruit", {
    name: Sequelize.STRING,
    color: Sequelize.STRING
})

module.exports = { Fruit };