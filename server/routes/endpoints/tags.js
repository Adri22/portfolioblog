const express = require('express');
const { ObjectID } = require('mongodb');
const MongoHandler = require('../../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();

const dbCollection = "tags";

app.get("/gettags", async (req, res) => {
    await mongoHandler.find(req, res, dbCollection);
});

app.post("/settag", async (req, res) => {
    await mongoHandler.insertOne(req, res, dbCollection, req.body);
});

app.delete("/deletetag", async (req, res) => {
    const query = { _id: { $eq: ObjectID(req.query.id) } };
    await mongoHandler.deleteOne(req, res, dbCollection, query);
});

module.exports.api = app;