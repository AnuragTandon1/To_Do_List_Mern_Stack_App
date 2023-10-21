import express from 'express'
import mongoose from 'mongoose'
 import AuthMiddleware from './middlewares/AuthMiddleware.js';
import apiRoute, { apiProtected } from './utils/api.js';
import { DB_CONNECT } from './utils/constants.js';
import cors from 'cors'
const app=express()
mongoose.set('strictQuery',false)
// mongoose.connect(DB_CONNECT,{useNewUrlParser :true,
//     useUnifiedTopology :true},(e)=>console.log(e))
const connectDB=async()=>{
    try {
       await mongoose.connect(DB_CONNECT,{
        useNewUrlParser :true,
        useUnifiedTopology :true,
       
       },
       
      ) 

      console.log('mongoDB is connected')
     
      
       
     
      
       
    } catch (error) {
        console.log('mongoDB is not connected')  
    }
}
const PORT=8000;
app.use(cors())
app.use(express.json())
app.use('/api/',apiRoute)
app.use('/api/',AuthMiddleware, apiProtected)
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running")})