const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const http = require('http');
const settings = require('./environment-settings.json');
const api = require('./server/routes/api');

const app = express();

const application = settings.application;

const defaultPort = settings.server.port;
const port = process.env.PORT || defaultPort;

const logOn = settings.server.settings.logger;

const production = settings.server.settings.production;
const env = production ? "dist" : "src"; // development or production environment?

app.set("port", port);

app.use(function (req, res, next) { // logging
    if (logOn) {
        console.log(`${moment().format('lll')}: request at ${req.originalUrl}`);
    }
    next();
});

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", `http://${application.host}:${application.port}`);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, env)));

app.use("/api", api);

app.get("*", (req, res) => {
    let p = path.join(__dirname, `${env}/index.html`);
    res.sendFile(p);
    // console.log(p);
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server listening at ${server.address().address}:${port}`);
});


