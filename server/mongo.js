const { MongoClient } = require('mongodb');

const dbConnection = { // TODO: add to external settings-file
    host: "localhost",
    port: "27017",
    name: "portfolioblog",
    auth: {
        mechanism: "DEFAULT",
        user: encodeURIComponent("devUser"),
        pwd: encodeURIComponent("test")
    }
}

class MongoHandler {
    #uri = `mongodb://`
        + `${dbConnection.auth.user}:${dbConnection.auth.pwd}`
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