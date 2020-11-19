const express = require('express');
const MongoHandler = require('../mongo');
const blogAPI = require('./endpoints/blog').api;
const portfolioAPI = require('./endpoints/portfolio').api;
const tagsAPI = require('./endpoints/tags').api;

const app = express();
const mongoHandler = MongoHandler.getInstance();

mongoHandler.connect(); // establish a single connection by calling this just once here and thats it

app.use("/blog", blogAPI);
app.use("/portfolio", portfolioAPI);
app.use("/tags", tagsAPI);

module.exports.api = app;