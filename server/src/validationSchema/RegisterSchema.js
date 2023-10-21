import {check} from 'express-validator'
export const RegisterSchema =[
    check('name').trim().isAlpha().withMessage("Name should be alphabets only"),
    check('username','username is required').exists().isAlphanumeric().withMessage('username should be alpha numeric chracters only').trim().isLength({min : 6 , max : 32}),
    check('password','password is required').isLength({min : 6 , max : 90}).trim(),
    check('email','email is required').exists().isEmail(),

]