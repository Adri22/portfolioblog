const express = require('express');
const multer = require('multer');
const { ObjectID } = require('mongodb');
const MongoHandler = require('../../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();
const storage = mongoHandler.getGridStorage();
const upload = multer({ storage: storage });

const dbCollection = "portfolio";

app.post("/setfile", upload.single("artworkfile"), async (req, res) => {
    console.log(req.file);
});

module.exports.api = app;