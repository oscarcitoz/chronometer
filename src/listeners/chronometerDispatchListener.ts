import BaseListener from "./baseListener.ts";
import BaseProcessor from "../processors/baseProcessor.ts";
import ChronometerDispatchProcessor from "../processors/chronometerDispatchProcessor.ts";
import { CHRONOMETER_DISPATCH_COLLECTION } from "../models/chronometerDispatch.ts";

class ChronometerDispatchListener extends BaseListener {
    private readonly processor: BaseProcessor;

    constructor() {
        super();
        this.processor = new ChronometerDispatchProcessor();
    }

    protected getProcessor(): BaseProcessor {
        return this.processor;
    }
    protected getCollection(): string {
        return CHRONOMETER_DISPATCH_COLLECTION;
    }
}

function createChronometerDispatchListener() {
    const listener = new ChronometerDispatchListener();

    listener.startWatching().then(() => {
    }).catch((err) => {
        console.error(
            "Error change stream:",
            CHRONOMETER_DISPATCH_COLLECTION,
            err,
        );
    });
}

export default createChronometerDispatchListener;
