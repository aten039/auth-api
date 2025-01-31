import { Types } from "mongoose";

export function validate_objectId(objectId:string):boolean {
    return Types.ObjectId.isValid(objectId)
}