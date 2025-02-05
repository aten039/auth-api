import { Request, Response } from "express"
import { hashPassword, validatePassword } from "../utils/passwordHash"
import User from "../models/User"
import Token from "../models/Token"
import { generateToken, sendTokenEmail } from "../utils/tokenUtils"
import jwt from "jsonwebtoken"
import { validate_objectId } from "../utils/validate_objectId"
import BlackJwt from "../models/BlackJwt"

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
            token.user = user.id

            await token.save()
            
            // send email with token 
            sendTokenEmail(token.token)
            // send wmail withh token

            return res.status(200).send("usuario creado correctamente, verifica tu correo electronico")

        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error al crear usuario, intente de nuevo.`,
                error:true,
            }})
        }
    }

    //login

    static login = async (req:Request, res:Response)=>{

        try {
            const user = await  User.findOne({email:req.body.email})

            if (!user){
                return res.status(401).json({error:{
                    message:`Datos erroneos, intente nuevamente.`,
                    error:true,
                }})
            }

            if(!user.confirmed){
                
                return res.status(400).json({error:{
                    message:`cuenta no confirmada`,
                    error:true,
                }})

            }

            const passwordValid = await validatePassword(req.body.password, user.password)

            if(!passwordValid){
                return res.status(403).json({error:{
                    message:`Datos erroneos, intente nuevamente.`,
                    error:true,
                }})
            }
            
            const token = jwt.sign({ id:user._id },process.env.KEY_JWT, { expiresIn: '150d'});

            return res.status(200).send(token)

        } catch (error) {
             return res.status(500).json({error:{
                message: `Ha ocurrido un error al iniciar sesion, intente de nuevo.`,
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

            if(user.confirmed){
                await token.deleteOne()
                return res.status(500).json({error:{
                    message: `La cuenta ya se encuentra confirmada.`,
                    error:true,
                }})
            }else{
                user.confirmed = true
            }

            await Promise.all([user.save(), token.deleteOne()])
            return res.send('Cuenta confirmada correctamente')
            

        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error al confirmar cuenta, intente de nuevo.`,
                error:true,
            }})
        }
    }
    

    //get User

    static get_account =  async (req:Request, res:Response) => {
        try {

            if(!validate_objectId(req.params.id)){
                return res.status(400).json({error:{
                    message:`Ha ocurrido un error`,
                    error:true,
                }})
            }

            const user = await User.findById(req.params.id).select('id name email phone country confirmed' )

            if(!user){
                return res.status(404).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
            }

            return res.status(200).json({user:user})

        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }
    }

    // resend token 

    static new_token = async (req:Request, res:Response) => {
        try {
            const user = await User.findOne({_id:req.body.id})
            
            if(!user){
                return res.status(400).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
            }

            const tokenExist = await Token.findOne({"user":user.id})
            if(tokenExist){
                await tokenExist.deleteOne()
            }
            

            const token = new Token()
            token.user = user.id

            await token.save()

            // send token

            sendTokenEmail(token.token)

            // email 

            return res.status(200).send('Token enviado al correo')

        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }
    }

    // change password

    static change_password = async (req:Request, res:Response) => {

        try {

            const user = await User.findById(req.user.id)

            const passwordValid = await validatePassword(req.body.password, user.password)

            if(!passwordValid){
                return res.status(401).json({error:{
                    message:`contraseña incorrecta`,
                    error:true,
                }})
            }

            const newPassword = await hashPassword(req.body.newPassword)

            user.password = newPassword

            await user.save()

            const blackToken = new BlackJwt()
            blackToken.token = req.headers.authorization

            await blackToken.save()
            
            return res.status(200).send('Contraseña actualizada correctamente, vuelva a iniciar sesion')
            
        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }
    }

    // forgot your password request

    static forgot_password_request = async (req:Request, res:Response) => {

        try {
            
            const user = await User.findOne({"email":req.body.email})

            if(!user){
                return res.status(400).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
            }

            if(!user.confirmed){
                return res.status(400).json({error:{
                    message:`usuario no confirmado.`,
                    error:true,
                }})
            }

            const tokens = await Token.findOne({user:user.id})

            if(tokens){
                await tokens.deleteOne()
            }

            const token = new Token()
            token.user = user.id

            await token.save()

            //send email
            sendTokenEmail(token.token)
            // 

            return res.status(200).send('verifica tu correo electronico o telefono.')

        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }
    }

    //forgot your password

    static forgot_password = async (req:Request, res:Response) => {

        try {
            
            const user = await User.findOne({"email":req.body.email})

            if(!user){
                return res.status(400).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
            }

            const token = await Token.findOne({token:req.body.token})

            if(!token){
                return res.status(400).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
            }

            if(token.user.toString() !== user.id.toString()){
                return res.status(400).json({error:{
                    message:`ha ocurrido un error`,
                    error:true,
                }})
                
            }
            const jwtoken = jwt.sign({ id:user._id },process.env.KEY_JWT, { expiresIn: '15m'});

            await token.deleteOne()
            
            return res.status(200).send(jwtoken)


        } catch (error) {
            return res.status(500).json({error:{
                message: `Ha ocurrido un error en la petición, intente de nuevo.`,
                error:true,
            }})
        }

    }

}
