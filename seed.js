const { Fruit, User } = require("./models/index")
const { seedFruits, seedUsers } = require("./seedData");
const { sequelize } = require("./db")

const syncSeed = async () => {
    await sequelize.sync({force: true});
    await Fruit.bulkCreate(seedFruits);
    await User.bulkCreate(seedUsers);
}

syncSeed()