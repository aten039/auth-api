import mongoose, {Schema, Document, Types} from "mongoose";

export interface IBlackJwt extends Document {
    token:string
    createdAt:Date
}

const BlackJwtSchema:Schema = new Schema({

    token: {
        type: String,
        require: true
    },
    createdAt:{
        type:Date,
        default: ()=> Date.now(),
        expires: '150d'
    }
})

const BlackJwt = mongoose.model<IBlackJwt>("BlackJwt", BlackJwtSchema)

export default BlackJwt