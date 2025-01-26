import { Types } from "mongoose";

export async function validate_objectId(objectId) {
    console.log(Types.ObjectId.isValid(objectId))
}