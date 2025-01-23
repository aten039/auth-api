import { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/passwordHash"


export class AuthController {

    static create_account = async(req:Request, res:Response)=>{
        
        try {

            const passwordHash = await hashPassword(req.body.password)
            const userData = {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                country: req.body.country,
                password: passwordHash,
                phone: req.body.hasOwnProperty('phone') ? req.body.phone : null,
                isAdmin : false,
                confirmed: false
            }

            const user = new User(userData)
            await user.save()
            return res.status(200).send("usuario creado correctamente")

        } catch (error) {
            return res.status(400).json({error:{
                message: error.message ? error.message: `Ha ocurrido un error al crear usuario, intente de nuevo.`,
                error:true,
            }})
        }
    }
}
