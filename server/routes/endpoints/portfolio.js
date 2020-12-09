const express = require('express');
const multer = require('multer');
const { ObjectID } = require('mongodb');
const MongoHandler = require('../../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();

const dbCollection = "portfolio";

const gridStorage = mongoHandler.createGridStorage(
    (req, file) => {
        if (file.mimetype === "image/png") { // TODO: Check for more mimetypes
            return {
                bucketName: dbCollection
            };
        } else {
            return null;
        }
    }
);

const upload = multer({ storage: gridStorage });

app.post("/setfile", upload.single("artworkfile"), async (req, res) => {
    console.log(req.file);
});

module.exports.api = app;