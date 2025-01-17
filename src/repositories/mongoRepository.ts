import { MongoClient } from "$mongodb";
import { getEnv } from "../configurations/environments.ts";
import { CHRONOMETER_COLLECTION } from "../models/chronometer.ts";
import { CHRONOMETER_DISPATCH_COLLECTION } from "../models/chronometerDispatch.ts";

class MongoRepository {
    private client: MongoClient;
    private readonly dbName: string;
    private readonly url: string;

    constructor(url: string, dbName: string) {
        this.url = url;
        this.dbName = dbName;
        this.client = new MongoClient(this.url);
    }

    public async connect() {
        try {
            await this.client.connect();
            console.log("Successful connection to MongoDB");
        } catch (error) {
            console.error("Connection error:", error);
        }
    }

    public async runMigrations() {
        try {
            await this.getDB().collection(
                CHRONOMETER_DISPATCH_COLLECTION,
            ).createIndex({ ttl_at: 1 }, {
                expireAfterSeconds: 0,
            });
            await this.getDB().collection(
                CHRONOMETER_COLLECTION,
            ).createIndex({ reference_id: 1 }, { unique: true });
        } catch (error) {
            console.log("error run migrations", error);
        }
    }

    public getChangeStream(collectionName: string) {
        const collection = this.getDB().collection(collectionName);

        return collection.watch([], {
            fullDocument: "updateLookup",
        });
    }

    public getDB() {
        return this.client.db(this.dbName);
    }
}

const env = await getEnv();
const mongoRepository = new MongoRepository(env["MONGO_URI"], env["MONGO_DB"]);
await mongoRepository.connect();
await mongoRepository.runMigrations();

export default mongoRepository;
