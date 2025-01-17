import { Request, Response } from "express"


export class AuthController {

    static auth = async(req:Request, res:Response)=>{

        res.status(200).send('Hola')

    }
   
    static createUser = async(req:Request, res:Response)=>{

        res.status(200).send('Hola')

    }



}
