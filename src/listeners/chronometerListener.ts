import BaseListener from "./baseListener.ts";
import BaseProcessor from "../processors/baseProcessor.ts";
import ChronometerProcessor from "../processors/chronometerProcessor.ts";
import {CHRONOMETER_COLLECTION} from "../models/chronometer.ts";

class ChronometerListener extends BaseListener {
    private readonly processor: BaseProcessor;

    constructor() {
        super();
        this.processor = new ChronometerProcessor();
    }

    protected getProcessor(): BaseProcessor {
        return this.processor;
    }
    protected getCollection(): string {
        return CHRONOMETER_COLLECTION;
    }
}

function createChronometerListener() {
    const listener = new ChronometerListener();

    listener.startWatching().then(() => {
    }).catch((err) => {
        console.error("Error change stream:", CHRONOMETER_COLLECTION, err);
    });
}

export default createChronometerListener;
