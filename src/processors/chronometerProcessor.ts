import BaseProcessor from "./baseProcessor.ts";
import ChangeEvent from "../models/changeEvent.ts";
import Chronometer from "../models/chronometer.ts";
import chronometerDispatchRepository from "../repositories/chronometerDispatchRepository.ts";

class ChronometerProcessor implements BaseProcessor {
    async runLogicUpsert(changeEvent: ChangeEvent): Promise<void> {
        const chronometer = changeEvent.fullDocument as Chronometer;
        await chronometerDispatchRepository.upsert(chronometer._id, chronometer);
    }

    async runLogicDelete(changeEvent: ChangeEvent): Promise<void> {
        await chronometerDispatchRepository.delete(changeEvent.documentKey._id);
    }
}

export default ChronometerProcessor;
