const express = require("express")
const user_router = require("../routes/users");
const fruit_router = require("../routes/fruits");
const app = express()

app.use(express.json());
app.use("/users", user_router);
app.use("/fruits", fruit_router);

module.exports = app;
