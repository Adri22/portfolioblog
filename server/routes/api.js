const express = require('express');
const { response } = require('express');
const { MongoClient } = require('mongodb');
// const objectID = require('mongodb').objectID;

const dbConnection = { // TODO: add to external settings-file
    host: "localhost",
    port: "27017",
    name: "portfolioblog"
}

const mongoURI = `mongodb://${dbConnection.host}:${dbConnection.port}`;

const mongoClient = new MongoClient(mongoURI, { useUnifiedTopology: true });
const router = express.Router();

async function runDB() {
    try {
        // Connect the client to the server
        await mongoClient.connect();

        // Establish and verify connection
        await mongoClient.db(dbConnection.name).command({ ping: 1 });
        console.log("Connected successfully to database");
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoClient.close();
    }
}

const handleResult = (res, data) => {
    response.status = 200;
    response.data = data;
    res.status(response.status).json(response);
}

const handleError = (res, err) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    res.status(response.status).json(response);
}

// test-endpoint
router.get("/test", (req, res) => {
    // add mongo-query here
});

router.get("/bla", (req, res) => { // test
    res.send({ testtext: "testtesttest123" });
});

runDB().catch(console.dir);

module.exports = router;


