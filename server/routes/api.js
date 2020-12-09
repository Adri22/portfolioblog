const express = require('express');
const MongoHandler = require('../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();

mongoHandler.connect( // establish a single connection by calling this just once here and thats it
    () => {
        app.use("/blog", require('./endpoints/blog').api);
        app.use("/portfolio", require('./endpoints/portfolio').api);
        app.use("/tags", require('./endpoints/tags').api);
    }
);

module.exports.api = app;