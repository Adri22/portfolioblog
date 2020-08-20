const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const api = require('./server/routes/api'); // MongoDB-API

const app = express();
const port = process.env.PORT || "3000";

const production = false; // TODO: add to external settings-file
let mode; // development or production environment?

if (production) {
    mode = "dist";
} else {
    mode = "src";
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, mode)));
app.use("/api", api);

app.set("port", port);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, mode + "/index.html"));
});

/*
app.get("/", (req, res) => {
    res.send("Testtesttest");
});
*/

const server = http.createServer(app);

server.listen(port, () => {
    console.log("app listening at http://localhost:" + port);
});


