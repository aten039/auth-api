import { NextFunction, Request, Response } from "express";
import User from "../models/User";


export async function validate_email_unique(req:Request, res:Response , next: NextFunction){

    try {

        //email w3.org
        // const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


        //all emails
        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if(!regex.test(req.body.email)){
            return res.status(400).json({error:{
                message: `El correo electronico es incorrecto`,
                error:true
            }})
        }

        const user = await User.findOne({email:req.body.email})

        if(user){
            return res.status(400).json({error:{
                message: `El correo electronico ya se encuentra en uso`,
                error:true
            }})
        }

        return next()

    } catch (error) {
        return res.status(400).json({error:{
                    message: `El correo electronico es incorrecto o se encuentra en uso`,
                    error:true
                }})
    }
}

export async function validate_phone_data(req:Request, res:Response , next: NextFunction){

    try {

        //you can activare regex for phone in your area.
        // const regex = //
        // if(!regex.test(req.body.phone)){
        //     return res.status(400).json({error:{
        //         message: `El numero de telefono es incorrecto`,
        //         error:true
        //     }})
        // }
        console.log(!req.body.phone)
        if (!req.body.phone){
            return next()
        }

        const user = await User.findOne({phone:req.body.phone})

        if(user){
            return res.status(400).json({error:{
                message: `El numero de telefono ya se encuentra en uso`,
                error:true
            }})
        }

        return next()

    } catch (error) {
        return res.status(400).json({error:{
            message: `El numero de telefono incorrecto o se encuentra en uso`,
            error:true
        }})
    }
}