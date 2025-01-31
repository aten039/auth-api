import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate_body } from "../middleware/validator_body";
import { validate_email_unique, validate_phone_data } from "../middleware/validate_unique_data";
import { validate_params } from "../middleware/validate_params";
import { authenticate } from "../middleware/authoryzed";


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

authRouter.post('/confirm_account', 
    validate_body('token', 'string'),
    AuthController.confirm_account
)

authRouter.get('/get_user/:id',
    validate_params('id'),
    AuthController.get_account
)

authRouter.post('/new_token',
    validate_body('id', 'string'),
    AuthController.new_token
)

authRouter.post('/change_password',
    authenticate,
    validate_body('password', 'string'),
    validate_body('newPassword', 'string'),
    AuthController.change_password
)

export default authRouter