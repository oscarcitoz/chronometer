import { ObjectId } from "$mongodb";

export const CHRONOMETER_COLLECTION = "chronometer";

export const IN_PROGRESS_STATE = "in_progress";
export const FINISHED_STATE = "finished";

interface Chronometer {
    _id: ObjectId;
    reference_id: string;
    seconds_for_run: number;
    start_at: Date;
    ends_at?: Date;
    state: string;
    request_config: {
        url: string;
        method: "POST" | "PUT";
        headers?: Record<string, string>;
        body?: {
            [key: string]: unknown;
        };
    };
    response?: any;
}

export default Chronometer;
