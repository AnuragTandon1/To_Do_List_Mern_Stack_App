import { validationResult } from "express-validator"
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
export const RemoveTodo=async(req , res)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped()))
    }
    try {
        const result=await Todo.findByIdAndDelete({
            userId : req.userId,
            _id : req.body.todo_id,
        })
        if(result){
            const user =await User.findByIdAndUpdate({
                _id : req.userId,
            },{
                $pull :{todos : req.body.todo_id}
            })
            return res.json(jsonGenerate(StatusCode.SUCCESS,"todo deleted",null))   
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROSSABLE_ENTITY,"could not deleted",null))   
    }
}