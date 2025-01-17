import ChangeEvent from "../models/changeEvent.ts";
import BaseProcessor from "../processors/baseProcessor.ts";
import mongoRepository from "../repositories/mongoRepository.ts";

abstract class BaseListener {
    protected abstract  getCollection(): string;
    protected abstract  getProcessor(): BaseProcessor;

    async startWatching() {
        const changeStream = mongoRepository.getChangeStream(
            this.getCollection(),
        );

        console.log(
            "Listening changes:",
            this.getCollection(),
        );

        changeStream.on("change", (change) => {
            try {
                const changeEvent = change as ChangeEvent;
                this.processEvent(changeEvent);
            } catch (ex) {
                console.error("Error change stream:", this.getCollection(), ex);
            }
        });
    }

    protected processEvent(changeEvent: ChangeEvent) {
        if (changeEvent.operationType === "delete") {
            this.getProcessor().runLogicDelete(changeEvent);
        } else {
            this.getProcessor().runLogicUpsert(changeEvent);
        }
    }
}

export default BaseListener;
