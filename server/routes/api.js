const express = require('express');
const MongoHandler = require('../mongo');
const blogAPI = require('./endpoints/blog').api;
const portfolioAPI = require('./endpoints/portfolio').api;
const tagsAPI = require('./endpoints/tags').api;

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

app.use("/blog", blogAPI);
app.use("/portfolio", portfolioAPI);
app.use("/tags", tagsAPI);

// test-endpoint
app.get("/gettest", async (req, res) => {
    await this.handleRequest(req, res, () => mongoHandler.findIn("test"));
});

app.post("/settest", async (req, res) => {
    await this.handleRequest(req, res, () => mongoHandler.insertIn("test", req.body));
});

module.exports.api = app;