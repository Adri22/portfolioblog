const express = require('express');
const MongoHandler = require('../mongo');

const app = express();
const mongoHandler = new MongoHandler();

mongoHandler.connect();

module.exports.handleRequest = async (req, res, action) => {
    try {
        let data = await action();
        res.status(200).send(data);
    } catch (err) {
        console.log(`something bad happened: ${err}`);
        res.status(500).send(err);
    }
}

// test-endpoint
app.get("/gettest", async (req, res) => {
    await this.handleRequest(req, res, () => mongoHandler.findIn("test"));
});

app.post("/settest", async (req, res) => {
    await this.handleRequest(req, res, () => mongoHandler.insertIn("test", req.body));
});

module.exports.api = app;