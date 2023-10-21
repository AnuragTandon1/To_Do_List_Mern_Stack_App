import React, { useState , useEffect } from 'react'
import { register } from '../services/Api'
import {useNavigate} from 'react-router-dom'
import Header from './partails/Header'
function Register() {
    const navigate =useNavigate()
    const [form , setForm] =useState({
        name :"",
        username :"",
        email :"",
        password : ""
    })
    const [errors, setErrors]=useState(null);
    useEffect(()=>{
       const user= localStorage.getItem('user')
       if(user){
        navigate('/')
       }
    },[])
    const handleInputChange =(e)=>{
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handleSubbmit =async()=>{
        const result= await register(form)
        if(result.status === 200){
         if(result.data.status === 201){
            setErrors(result.data.data)
            alert(result.data.message)
            return ;
         }
         if(result.data.status === 200){
            // localStorage.setItem('user',JSON.stringify(result.data.data))
            navigate('/login')
            return ;
         }
         if(result.data.status === 202){
            alert(result.data.message)
            return ;
         }
        }
        else{
            alert('something went wrong')
        }
         
        
    }
  return (
    <>
    <Header/>
      <div className='container'>
       <div className='row justify-content-md-center mt-4'>
   <div className='col-lg-5 card border-primary mb-3' >
   <div className='card-header h4 text-center'>
     Register an Account
   </div>
   <div className='card-body'>
   <div className='form-group'>
     <label className='col-form-label mt-4 mb-1'>Name</label>
     <input type='text' name='name' onChange={handleInputChange} className='form-control' placeholder='Enter your name' />
    </div>
    <div className='form-group'>
     <label className='col-form-label mt-4 mb-1'>Username</label>
     <input type='text' name='username' onChange={handleInputChange} className='form-control' placeholder='Enter your username' />
    </div>
    <div className='form-group'>
     <label className='col-form-label mt-4 mb-1'>Email</label>
     <input type='text' name='email' onChange={handleInputChange} className='form-control' placeholder='Enter your Email' />
    </div>
    <div className='form-group'>
     <label className='col-form-label mt-4 mb-1'>Password</label>
     <input type='password' name='password' onChange={handleInputChange} className='form-control' placeholder='Enter your password' />
    </div>
    <div className='row justify-content-md-center form-group mt-4'>
<button type='button' onClick={handleSubbmit} className='col-sm-6 btn-outline-secondary btn center'>Register now</button>
    </div>
   </div>
   </div>
       </div>
      </div>
    </>
  )
}

export default Register
