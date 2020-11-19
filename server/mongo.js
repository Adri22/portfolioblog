const { MongoClient } = require('mongodb');
const settings = require('../environment-settings.json');

const dbConnection = settings.database;

class MongoHandler {
    #uri = `mongodb://`
        + `${encodeURIComponent(dbConnection.auth.user)}:${encodeURIComponent(dbConnection.auth.pwd)}`
        + `@${dbConnection.host}:${dbConnection.port}`
        + `/?authMechanism=${dbConnection.auth.mechanism}`;

    #mongoClient = null;
    #db = null;
    static #instance = null;

    constructor() { // TODO: make constructor private? somehow?
        this.#mongoClient = new MongoClient(this.#uri, { useUnifiedTopology: true });
    }

    static getInstance() { // singleton-design: only use this function to return a instance
        if (this.#instance) {
            return this.#instance;
        } else {
            return this.#instance = new MongoHandler();
        }
    }

    #handleRequest = async (req, res, action) => {
        try {
            let data = await action();
            res.status(200).send(data);
        } catch (err) {
            console.log(`something bad happened: ${err}`);
            res.status(500).send(err);
        }
    }

    async connect() {
        try {
            await this.#mongoClient.connect(); // Connect the client to the server
        } catch (err) {
            console.log(err);
        } finally {
            console.log(`Connected successfully to database ${dbConnection.name}`);
            this.#db = this.#mongoClient.db(dbConnection.name); // get database-object
            // await this.#mongoClient.close();
        }
    }

    async findIn(req, res, collectionName) {
        return await this.#handleRequest(req, res,
            () => this.#db.collection(collectionName).find().toArray()
        );
    }

    async insertIn(req, res, collectionName, data) {
        return await this.#handleRequest(req, res,
            () => this.#db.collection(collectionName).insertOne(data)
        );
    }



}

module.exports = MongoHandler;