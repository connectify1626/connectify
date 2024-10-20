import { body } from 'express-validator';
import UserInfo from "../models/userInfo.js";

//#region Auth Validations
export const registerValidations = [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email').custom(async value => {
        const user = await UserInfo.findOne({email: value});
        if (user) {
            throw new Error('Email already in use');
        }
    }),
    body('username').custom(async value => {
        const user = await UserInfo.findOne({username: value});
        if (user) {
            throw new Error('Username already in use');
        }
    }),
];

export const loginValidations = [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];
//#endregion