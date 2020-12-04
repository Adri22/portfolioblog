const express = require('express');
const multer = require('multer');
const { ObjectID } = require('mongodb');
const MongoHandler = require('../../mongo');

const app = express();
const upload = multer();
const mongoHandler = MongoHandler.getInstance();

const dbCollection = "portfolio";

app.post("/setfile", upload.single("artworkfile"), async (req, res) => {
    console.log("file upload test");
    console.log(req.body);
    console.log(req.file);
    res.status(200).send(JSON.stringify("file upload ok"));
});

module.exports.api = app;