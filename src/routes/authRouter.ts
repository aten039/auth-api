import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router()

authRouter.get('/saludo',AuthController.auth )

export default authRouter