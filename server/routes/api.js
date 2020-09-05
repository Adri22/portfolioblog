const express = require('express');
const MongoHandler = require('../mongo');

const app = express();
const mongoHandler = new MongoHandler();

mongoHandler.connect();

// test-endpoint
app.get("/test", async (req, res) => {
    let data = null;

    try {
        data = await mongoHandler.findIn("test");
    } catch (err) {
        console.log(`something bad happened: ${err}`);
    }

    res.send(data);
});

module.exports = app;