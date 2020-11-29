const express = require('express');
const { ObjectID } = require('mongodb');
const MongoHandler = require('../../mongo');

const app = express();
const mongoHandler = MongoHandler.getInstance();

const dbCollection = "blog";


module.exports.api = app;