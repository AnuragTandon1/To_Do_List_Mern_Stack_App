import { validationResult } from "express-validator"
import { JWT, StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
import bcrypt from 'bcrypt'
import User from "../models/User.js"
import Jwt from 'jsonwebtoken'
const Register= async(req , res) => {
    const errors=validationResult(req)
    if (errors.isEmpty()){
    const {name , username , password , email}=req.body;
     const salt =await bcrypt.genSalt(10)
     const hashPassword=await bcrypt.hash(password,salt)
    const userExist =await User.findOne({$or : [{
        email : email
    },{
        username : username
    }]})
    if(userExist){
        return res.json(jsonGenerate(StatusCode.UNPROSSABLE_ENTITY,"user or email already exist"))
    }
     try {
        const result= await User.create({
            name: name,
            username: username,
            password: hashPassword,
            email:email,
        })
        const token =Jwt.sign({userId : result._id},JWT)
        res.json(jsonGenerate(StatusCode.SUCCESS,"registeration successful",{userId : result._id , token : token}))
     } catch (error) {
        
     }
    }res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
  
}
export default Register