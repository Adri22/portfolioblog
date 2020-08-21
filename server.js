const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const api = require('./server/routes/api'); // MongoDB-API

const app = express();

const defaultPort = "3000"; // TODO: add to external settings-file
const port = process.env.PORT || defaultPort;

const production = false; // TODO: add to external settings-file
let env; // development or production environment?

if (production) {
    env = "dist";
} else {
    env = "src";
}

app.set("port", port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, env)));
app.use("/api", api);

app.get("*", (req, res) => {
    let p = path.join(__dirname, env + "/index.html");
    res.sendFile(p);
    // console.log(p);
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log("server listening at " + server.address().address + ":" + port);
});


