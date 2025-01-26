import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate_body } from "../middleware/validator_body";
import { validate_email_unique, validate_phone_data } from "../middleware/validate_unique_data";


const authRouter = Router()

authRouter.post('/create_account', 
    validate_body('name', 'string'),
    validate_body('lastName', 'string'),
    validate_body('email', 'string'),
    validate_email_unique,
    validate_body('country', 'string'),
    validate_body('password', 'string'),
    validate_phone_data,
    AuthController.create_account 
)

authRouter.post('/login', 
    validate_body('email', 'string'),
    validate_body('password', 'string'),
    AuthController.login
)

export default authRouter