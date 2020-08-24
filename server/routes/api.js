const express = require('express');
const { response } = require('express');
const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').objectID;

const router = express.Router();

const dbConnection = { // TODO: add to external settings-file
    host: "localhost",
    port: "27017",
    name: "portfolioblog"
}

const connection = (closure) => {
    return mongoClient.connect("mongodb://" + dbConnection.host + ":" + dbConnection.port + "/" + dbConnection.name, (err, db) => {
        if (err) {
            return console.log(err);
        }
        closure(db);
    });
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
    connection((db) => {
        db.collection("test")
            .find()
            .toArray()
            .then((test) => {
                handleResult(res, test);
            })
            .catch((err) => {
                handleError(res, err);
            });
    });
});

router.get("/bla", (req, res) => { // test
    res.send({ testtext: "testtesttest123" });
});

module.exports = router;


