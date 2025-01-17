import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {

}

const userSchema:Schema = new Schema({

    name:{
        type:String,
        require:true,
    }, 
    phone:{
        type:String,
        null:true,
        unique:true,
        max: 20,
        default:null
    },
    country:{
        type:String,
        require:true, 
        default:"S/E"
    },
    email: {
        type:String,
        require:true,
        lowercase:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    confirmed: {
        type:Boolean,
        require:true,
        default:false
    },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User