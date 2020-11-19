const express = require('express');
const MongoHandler = require('../../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();

const dbCollection = "tags";

app.get("/gettags", async (req, res) => {
    await mongoHandler.findIn(req, res, dbCollection);
});

app.post("/settag", async (req, res) => {
    await mongoHandler.insertIn(req, res, dbCollection, req.body);
});

module.exports.api = app;