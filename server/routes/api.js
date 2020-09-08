const express = require('express');
const MongoHandler = require('../mongo');

const app = express();
const mongoHandler = new MongoHandler();

mongoHandler.connect();

/*
handleError = (res, error) => {
    console.log(`something bad happened: ${error}`);
    res.status(500).send(error);
}
*/

// test-endpoint
app.get("/gettest", async (req, res) => {
    try {
        let data = await mongoHandler.findIn("test");
        res.status(200).send(data);
    } catch (err) {
        // this.handleError(res, err);
        console.log(`something bad happened: ${err}`);
        res.status(500).send(err);
    }
});

app.get("/settest", async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        // await mongoHandler.insertIn("test", req.body);
    } catch (err) {
        console.log(`something bad happened: ${err}`);
        res.status(500).send(err);
    }
});

module.exports = app;