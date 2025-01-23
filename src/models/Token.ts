import mongoose, {Schema, Document, Types} from "mongoose";

export interface IUser extends Document {
    name:string
    phone:string
    country:string
    email:string
    password:string
    confirmed: boolean
    is_admin: boolean
}

const tokenSchema:Schema = new Schema({

    token: {
        type: String,
        require: true,
    },
    user:{
        type:Types.ObjectId,
        require:true,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default: ()=> Date.now(),
        expires: '60m'
    }
})

const Token = mongoose.model("Token", tokenSchema)

export default Token