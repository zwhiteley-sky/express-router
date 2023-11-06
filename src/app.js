const express = require("express")
const user_router = require("../routes/users");
const app = express()

app.use(express.json());
app.use("/users", user_router);

module.exports = app;
