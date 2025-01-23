import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate_body } from "../middleware/validator_body";

const authRouter = Router()

authRouter.get('/create_account', 
    validate_body('name', 'string'),
    validate_body('lastName', 'string'),
    validate_body('email', 'string'),
    validate_body('country', 'string'),
    validate_body('password', 'string'),
    AuthController.create_account )

export default authRouter