const { MongoClient } = require('mongodb');
const GridFsStorage = require('multer-gridfs-storage');
const settings = require('../environment-settings.json');

const dbConnection = settings.database;

class MongoHandler {
    #uri = `mongodb://`
        + `${encodeURIComponent(dbConnection.auth.user)}:${encodeURIComponent(dbConnection.auth.pwd)}`
        + `@${dbConnection.host}:${dbConnection.port}`
        + `/?authMechanism=${dbConnection.auth.mechanism}`;

    #mongoClient = null;
    #db = null;
    #gridStorage = null;
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

    getGridStorage() {
        return this.#gridStorage;
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
            this.#gridStorage = new GridFsStorage({ db: this.#db });
            // await this.#mongoClient.close();
        }
    }

    async find(req, res, collectionName) {
        return await this.#handleRequest(req, res,
            () => this.#db.collection(collectionName).find().toArray()
        );
    }

    async insertOne(req, res, collectionName, data) {
        return await this.#handleRequest(req, res,
            () => this.#db.collection(collectionName).insertOne(data)
        );
    }

    async deleteOne(req, res, collectionName, query) {
        return await this.#handleRequest(req, res,
            () => this.#db.collection(collectionName).deleteOne(query)
        );
    }




}

module.exports = MongoHandler;