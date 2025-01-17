import { DeleteResult, ObjectId } from "$mongodb";
import mongoRepository from "./mongoRepository.ts";

import mongoDB from "$mongodb";
import ChronometerDispatch, {
    CHRONOMETER_DISPATCH_COLLECTION,
} from "../models/chronometerDispatch.ts";
import Chronometer from "../models/chronometer.ts";

class ChronometerDispatchRepository {
    private collection: mongoDB.Collection;

    constructor() {
        this.collection = mongoRepository.getDB().collection<
            ChronometerDispatch
        >(CHRONOMETER_DISPATCH_COLLECTION);
    }

     private calculateTTL(secondsToExpire: number) {
        const currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() + secondsToExpire);

        return currentTime;
    }

    public async upsert(id: ObjectId, chronometer: Chronometer) {
        const chronometerDispatch = {
            $set: {
                _id: id,
                created_at: new Date(),
                ttl_at: this.calculateTTL(chronometer.seconds_for_run)
            },
        };

        await this.collection.updateOne({ _id: id }, chronometerDispatch, {
            upsert: true,
        });
    }

    public async delete(id: ObjectId): Promise<DeleteResult> {
        return await this.collection.deleteOne({ _id: id });
    }
}

const chronometerDispatchRepository = new ChronometerDispatchRepository();

export default chronometerDispatchRepository;
