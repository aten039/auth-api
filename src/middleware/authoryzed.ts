import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import User, {IUser} from "../models/User"; 
import BlackJwt from "../models/BlackJwt";

declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}

export const authenticate = async (req:Request, res:Response, next:NextFunction)=>{

    try {
        const token = req.headers?.authorization

        if(!token){
            return res.status(401).json({
                message: `token incorrecto`,
                error:true
            })
        }

        const blackToken = await BlackJwt.findOne({token:req.headers.authorization})

        if(blackToken){
            return res.status(401).json({
                message: `problemas con la sesion`,
                error:true
            })
        }

        const decoded = jwt.verify(token,process.env.KEY_JWT)
        
        if(typeof decoded !== 'object'){
            return res.status(500).json({
                errors: {msg:'error en el servidor'}
            });
        }
        const user = await User.findById(decoded?.id).select('_id name email')
        if(!user){
            return res.status(500).json({
                errors: {msg:'error en el servidor'}
            });
        }
        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            errors: {msg:'error en el servidor'}
        });
    }
}