import BaseProcessor from "./baseProcessor.ts";
import ChangeEvent from "../models/changeEvent.ts";
import chronometerRepository from "../repositories/chronometerRepository.ts";
import { sendRequest } from "../externals/dispatchRequestor.ts";

class ChronometerDispatchProcessor implements BaseProcessor {
    async runLogicUpsert(_changeEvent: ChangeEvent): Promise<void> {
    }

    async runLogicDelete(changeEvent: ChangeEvent): Promise<void> {
        const chronometer = await chronometerRepository.find(
            changeEvent.documentKey._id,
        );

        if (chronometer != null) {
            const response = await sendRequest(chronometer);

            let responseData = null;
            try {
                responseData = await response.json();
            } catch (ex) {}

            await chronometerRepository.finish(chronometer, responseData);
        }
    }
}

export default ChronometerDispatchProcessor;
