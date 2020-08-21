const express = require('express');
const { response } = require('express');
const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').objectID;

const router = express.Router();

// TODO: add to external settings-file
const dbHost = "localhost";
const dbPort = "27017";
const dbName = "portfolioblog";

const connection = (closure) => {
    return mongoClient.connect("mongodb://" + dbHost + ":" + dbPort + "/" + dbName, (err, db) => {
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
    res.send("testtesttest123");
});

module.exports = router;


