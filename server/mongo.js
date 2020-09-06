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

    constructor() {
        this.#mongoClient = new MongoClient(this.#uri, { useUnifiedTopology: true });
    }

    async connect() {
        try {
            await this.#mongoClient.connect(); // Connect the client to the server
        } catch (err) {
            console.log(err);
        } finally {
            console.log(`Connected successfully to database ${dbConnection.name}`);
            this.#db = this.#mongoClient.db(dbConnection.name); // get database-object
            // await mongoClient.close();
        }
    }

    async findIn(collectionName) {
        return await this.#db.collection(collectionName).find().toArray();
    }



}

module.exports = MongoHandler;