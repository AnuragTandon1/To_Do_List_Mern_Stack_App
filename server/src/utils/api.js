import express from "express";
import { check } from "express-validator";
import Login from "../controllers/LoginController.js";
import { MarkTodo } from "../controllers/MarkTodoController.js";
import Register from "../controllers/RegisterController.js";
import { RemoveTodo } from "../controllers/RemoveTodoController.js";
import { createTodo } from "../controllers/TodoController.js";
import { GetTodos } from "../controllers/TodoListController.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
const apiRoute =express.Router()
export const apiProtected =express.Router()
apiRoute.post('/register',RegisterSchema,Register)
apiRoute.post('/login',LoginSchema,Login)
apiProtected.post("/createTodo",[check("desc","Todo desc is required").exists()],createTodo)
apiProtected.post("/marktodo",[check("todo_id","Todo id is required").exists()],MarkTodo)
apiProtected.post("/deleteTodo",[check("todo_id","Todo id is required").exists()],RemoveTodo)
apiProtected.get("/todolist",GetTodos)
export default apiRoute