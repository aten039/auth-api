import { Request, Response } from "express"
import { hashPassword, validatePassword } from "../utils/passwordHash"
import User from "../models/User"
import Token from "../models/Token"
import { generateToken } from "../utils/tokenUtils"
import jwt from "jsonwebtoken"
import { validate_objectId } from "../utils/validate_objectId"

export class AuthController {

    // create account
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

            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            await token.save()
            
            // send email with token 

            // send wmail withh token

            return res.status(200).send("usuario creado correctamente, verifica tu correo electronico")

        } catch (error) {
            return res.status(400).json({error:{
                message: error.message ? error.message: `Ha ocurrido un error al crear usuario, intente de nuevo.`,
                error:true,
            }})
        }
    }

    //login

    static login = async (req:Request, res:Response)=>{

        try {
            const user = await  User.findOne({email:req.body.email})

            if (!user){
                return res.status(404).json({error:{
                    message:`correo electronico invalido, intente de nuevo.`,
                    error:true,
                }})
            }

            if(!user.confirmed){
                // create new token and send for email
            }

            const passwordValid = await validatePassword(req.body.password, user.password)

            if(!passwordValid){
                return res.status(404).json({error:{
                    message:`contraseña incorrecta`,
                    error:true,
                }})
            }
            
            const token = jwt.sign({ id:user._id },process.env.KEY_JWT, { expiresIn: '150d'});

            return res.status(200).send(token)

        } catch (error) {
             return res.status(400).json({error:{
                message: error.message ? error.message: `Ha ocurrido un error al iniciar sesion, intente de nuevo.`,
                error:true,
            }})
        }
    }

    //Confirm account 

    static confirm_account = async (req:Request, res:Response) => {
        try {
            
            const token = await Token.findOne({token:req.body.token})
            
            if(!token){
                return res.status(404).json({error:{
                    message:`token incorrecto`,
                    error:true,
                }})
            }

            const user = await User.findById(token.user)

            user.confirmed = true

            await Promise.all([user.save(), token.deleteOne()])
            res.send('Cuenta confirmada correctamente')
            

        } catch (error) {
            return res.status(400).json({error:{
                message: error.message ? error.message: `Ha ocurrido un error al confirmar cuenta, intente de nuevo.`,
                error:true,
            }})
        }
    }
    

    //get User

    static get_account =  async (req:Request, res:Response) => {
        try {

            if(!validate_objectId(req.params.id)){
                return res.status(400).json({error:{
                    message:`Id no valido`,
                    error:true,
                }})
            }

            const user = await User.findById(req.params.id).select('id name email phone country confirmed' )

            if(!user){
                return res.status(404).json({error:{
                    message:`usuario no encontrado`,
                    error:true,
                }})
            }

            return res.status(200).json({user:user})

        } catch (error) {
            return res.status(400).json({error:{
                message: error.message ? error.message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }
    }

   
}
