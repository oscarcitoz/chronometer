import { DeleteResult, ObjectId } from "$mongodb";
import mongoRepository from "./mongoRepository.ts";
import mongoDB from "$mongodb";
import Chronometer, {
    CHRONOMETER_COLLECTION,
    FINISHED_STATE,
    IN_PROGRESS_STATE,
} from "../models/chronometer.ts";

class ChronometerRepository {
    private collection: mongoDB.Collection;

    constructor() {
        this.collection = mongoRepository.getDB().collection<
            Chronometer
        >(CHRONOMETER_COLLECTION);
    }

    public async find(
        id: ObjectId,
    ): Promise<Chronometer | null> {
        return await this.collection.findOne<
            Chronometer
        >({
            _id: id,
        });
    }

    public async upsert(chronometerForUpsert: Chronometer) {
        const chronometer = await this.findByReferenceId(
            chronometerForUpsert.reference_id,
        );

        if (chronometer?.state == FINISHED_STATE) {
            throw new Error("The chronometer already finished");
        }

        const chronometerSet = {
            $set: {
                reference_id: chronometerForUpsert.reference_id,
                request_config: chronometerForUpsert.request_config,
                seconds_for_run: chronometerForUpsert.seconds_for_run,
                state: IN_PROGRESS_STATE,
                start_at: Date(),
            },
        };

        await this.collection.updateOne(
            { reference_id: chronometerForUpsert.reference_id },
            chronometerSet,
            {
                upsert: true,
            },
        );
    }

    public async finish(chronometerForUpsert: Chronometer, response?: any) {
        const chronometerSet = {
            $set: {
                response: response,
                state: FINISHED_STATE,
                ends_at: Date(),
            },
        };

        await this.collection.updateOne(
            { _id: chronometerForUpsert._id },
            chronometerSet,
            {
                upsert: false,
            },
        );
    }

    public async findByReferenceId(
        referenceId: string,
    ): Promise<Chronometer | null> {
        return await this.collection.findOne<
            Chronometer
        >({
            reference_id: referenceId,
        });
    }

    public async delete(id: ObjectId): Promise<DeleteResult> {
        return await this.collection.deleteOne({ _id: id });
    }
}

const chronometerRepository = new ChronometerRepository();

export default chronometerRepository;
