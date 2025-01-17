import ChangeEvent from "../models/changeEvent.ts";

interface BaseProcessor {
    runLogicUpsert(changeEvent: ChangeEvent): Promise<void>;

    runLogicDelete(changeEvent: ChangeEvent): Promise<void>;
}

export default BaseProcessor;
