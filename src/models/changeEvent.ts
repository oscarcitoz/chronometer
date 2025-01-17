import { ObjectId } from "$mongodb";

interface ChangeEvent {
    operationType: string;
    fullDocument?: Record<string, any>;
    documentKey: {
        _id: ObjectId;
    };
}
export default ChangeEvent;
