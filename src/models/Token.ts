import mongoose, {Schema, Document, Types} from "mongoose";
import { generateToken } from "../utils/tokenUtils";

export interface Itoken extends Document {
    token:string
    user:Types.ObjectId
    createdAt:Date
}

const tokenSchema:Schema = new Schema({

    token: {
        type: String,
        require: true,
        default: ()=> generateToken()
    },
    user:{
        type:Types.ObjectId,
        require:true,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default: ()=> Date.now(),
        expires: '20m'
    }
})

const Token = mongoose.model<Itoken>("Token", tokenSchema)

export default Token