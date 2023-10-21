import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    name:{
        type : String,
       
    },
    username:{
        type : String,
        min : 6,
        max : 32,
        required : true
    },
    password:{
        type : String,
        min : 6,
        max : 32,
        required : true
    },
    email:{
        type : String,
       
        required : true
    },
    todos :[{
     type : mongoose.Schema.Types.ObjectId,
     ref : "Todo",
    }],
    date :{
        type : Date,
        default : Date.now
    }
},{
    timestamps : true,
})
export default mongoose.model("User",userSchema);