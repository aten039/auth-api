import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name:string
    phone:string
    country:string
    email:string
    password:string
    confirmed: boolean
    is_admin: boolean
}

const userSchema:Schema = new Schema({

    name:{
        type:String,
        require:true,
    }, 
    lastName:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        null:true,
        unique:true,
        max: 20,
        default: null
    },
    country:{
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
        lowercase:true,
        unique:true
    },
    password: {
        type:String,
        require:true,
        min:8,
        max:16
    },
    confirmed: {
        type:Boolean,
        require:true,
        default:false
    },
    isAdmin: {
        type:Boolean,
        default:false
    }
})

const User = mongoose.model<IUser>('User', userSchema)

export default User