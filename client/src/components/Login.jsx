import React, { useEffect, useState } from 'react'
import { login } from '../services/Api';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import Header from './partails/Header';
function Login() {
    const navigate =useNavigate()
    const [form , setForm]=useState({
        username :"",
        password : ""
    })
    useEffect(()=>{
        const user= localStorage.getItem('user')
        if(user){
         navigate('/')
        }
     },[])
    const [errors, setErrors]=useState(null);
    const handleChange =(e)=>{
        setForm({...form,[e.target.name] : e.target.value})
    }
    const handleSubmit=async()=>{
        const result = await login(form)
        console.log(result)
        setErrors(null)
        if(result.status===200){
          if(result.data.status ===200){
            localStorage.setItem('user',JSON.stringify(result.data.data))
            navigate("/")
            return;
          }
          if(result.data.status ===201){
             setErrors(result.data.data)
             return ;
          }
          if(result.data.status ===202){
            toast(result.data.message)
            return ;
          }
        }
    }
  return (

   <>
   <Header/>
  <div className='container'>
    <ToastContainer/>
<div className='row justify-content-center mt-4'>
<div className='col-lg-5 card border-primary mt-4'>
<div className='card-body'>
<h4 className='card-title'>Login Now</h4>
<div className='form-group'>
<label htmlFor='exampleInputEmail1' className='form-label mt-4'>Email or Username</label>
<input type="text" onChange={handleChange} name="username" className='form-control' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email or username'/>
{
    errors?.username && ( <small id= "emailHelp" className= "form-text text-muted">
    {errors.username.message}
    </small>
    )
}

</div>
<div className='form-group'>
<label htmlFor='exampleInputEmail1' className='form-label mt-4'>Password</label>
<input type="password" onChange={handleChange} name="password" className='form-control' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter password'/>
</div>
<button type='button' onClick={handleSubmit} className='btn btn-primary mt-4'>
    Login
</button>
</div>
</div>
</div>
  </div>
</>

  )
}

export default Login
