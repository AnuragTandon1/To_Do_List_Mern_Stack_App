import { validationResult } from "express-validator"
import Todo from "../models/Todo.js"
import User from "../models/User.js"
import {  StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
export const createTodo= async(req,res)=>{
   const error =validationResult(req)
   if(!error.isEmpty()){
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"To do is required",error.mapped()))
   }
   try {
    const result=await Todo.create({
        userId : req.userId,
        desc : req.body.desc,
    })
    if(result){
        const user = await User.findByIdAndUpdate({
            _id : req.userId
        },{
            $push : {todos : result}
        })
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo creaded sucessfully",result))
    }
   } catch (error) {
    return res.json(jsonGenerate(StatusCode.UNPROSSABLE_ENTITY,"Something went wrong",error))
   }
}