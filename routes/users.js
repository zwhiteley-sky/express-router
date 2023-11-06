const express = require("express");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");
const user_router = express.Router();

function validate(arr) {
    return async (req, res, next) => {
        for (const validator of arr) {
            const result = await validator.run(req);
            if (result.errors.length) break;
        }

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ error: result.array() });
        }

        return next();
    };
}

user_router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

user_router.get("/:id", async (req, res) => {
    const user_id = Number(req.params.id);
    if (isNaN(user_id)) return res.status(400).send("id must be a number");

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).send("user not found");

    res.json(user);
});

user_router.post("/", validate([
    body("name").notEmpty({ ignore_whitespace: true }).trim(),
    body("age").isNumeric()
]), async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

user_router.put("/:id", validate([
    body("name").optional().notEmpty({ ignore_whitespace: true }).trim(),
    body("age").optional().isNumeric()
]), async (req, res) => {
    const user_id = Number(req.params.id);
    if (isNaN(user_id)) return res.status(400).send("id must be a number");

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).send("user does not exist");

    const updated = await user.update(req.body);

    res.json(updated);
});

user_router.delete("/:id", async (req, res) => {
    const user_id = Number(req.params.id);
    if (isNaN(user_id)) return res.status(400).send("id must be a number");

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).send("user does not exist");

    await user.destroy();
    
    res.json(user);
});

module.exports = user_router;
