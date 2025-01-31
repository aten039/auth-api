import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import User, {IUser} from "../models/User"; 

declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}

export const authenticate =async (req:Request, res:Response, next:NextFunction)=>{

    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: `token incorrecto`,
            error:true
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.KEY_JWT)
        
        if(typeof decoded !== 'object'){
            return res.status(500).json({
                errors: {msg:'error en el servidor'}
            });
        }
        const user = await User.findById(decoded?.id).select('__id name email')
        if(!user){
            return res.status(500).json({
                errors: {msg:'error en el servidor'}
            });
        }
        req.user = user

    } catch (error) {
        return res.status(500).json({
            errors: {msg:'error en el servidor'}
        });
    }

    next()
}