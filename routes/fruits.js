const express = require("express");
const { Fruit } = require("../models");
const { body, validationResult } = require("express-validator");
const fruit_router = express.Router();

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

fruit_router.get("/", async (req, res) => {
    const fruits = await Fruit.findAll();
    res.json(fruits);
});

fruit_router.get("/:id", async (req, res) => {
    const fruit_id = Number(req.params.id);
    if (isNaN(fruit_id)) return res.status(400).send("id must be a number");

    const fruit = await Fruit.findByPk(fruit_id);
    if (!fruit) return res.status(404).send("fruit not found");

    res.json(fruit);
});

fruit_router.post("/", validate([
    body("name").notEmpty({ ignore_whitespace: true }),
    body("color").notEmpty({ ignore_whitespace: true }),
]), async (req, res) => {
    const fruit = await Fruit.create(req.body);
    res.json(fruit);
});

fruit_router.put("/:id", validate([
    body("name").optional().notEmpty({ ignore_whitespace: true }),
    body("color").optional().notEmpty({ ignore_whitespace: true }),
]), async (req, res) => {
    const fruit_id = Number(req.params.id);
    if (isNaN(fruit_id)) return res.status(400).send("id must be a number");

    const fruit = await Fruit.findByPk(fruit_id);
    if (!fruit) return res.status(404).send("fruit does not exist");

    const updated = await fruit.update(req.body);

    res.json(updated);
});

fruit_router.delete("/:id", async (req, res) => {
    const fruit_id = Number(req.params.id);
    if (isNaN(fruit_id)) return res.status(400).send("id must be a number");

    const fruit = await Fruit.findByPk(fruit_id);
    if (!fruit) return res.status(404).send("fruit does not exist");

    await fruit.destroy();
    
    res.json(fruit);
});

module.exports = fruit_router;
