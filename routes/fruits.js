const express = require("express");
const { Fruit } = require("../models");
const fruit_router = express.Router();

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

fruit_router.post("/", async (req, res) => {
    const fruit = await Fruit.create(req.body);
    res.json(fruit);
});

fruit_router.put("/:id", async (req, res) => {
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
