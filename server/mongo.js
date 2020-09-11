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

    #operation = async (action) => {
        try {
            return await action();
        } catch (err) { // TODO: add error-handling
            console.log(err);
        } finally { }
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

    async findIn(collectionName) {
        return await this.#operation(
            () => this.#db.collection(collectionName).find().toArray()
        );
    }

    async insertIn(collectionName, data) {
        return await this.#operation(
            () => this.#db.collection(collectionName).insertOne(data)
        );
    }



}

module.exports = MongoHandler;