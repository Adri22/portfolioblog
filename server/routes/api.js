const express = require('express');
const { response } = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').objectID;

// TODO: create external file with this data for deployment
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
};

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    res.status(501).json(response);
};

/*
let response = {
    status: 200,
    data: [],
    message: null
};
*/

// test-endpoint
router.get("/test", (req, res) => {
    connection((db) => {
        db.collection("test")
            .find()
            .toArray()
            .then((test) => {
                response.data = test;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;


