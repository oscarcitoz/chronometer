import { ObjectId } from "$mongodb";

export const CHRONOMETER_DISPATCH_COLLECTION = "chronometer_dispatch";

interface ChronometerDispatch {
    _id: ObjectId;
    created_at: Date;
    ttl_at: Date;
}

export default ChronometerDispatch;
