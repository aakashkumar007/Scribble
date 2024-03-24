/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

  const Signup = () => {
    const [formData,setFormData] = useState({})
    const navigate =useNavigate();



    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:4000/api/auth/register",formData);
        if (res.data.success) {
          toast.success('😃	Registration \n Successfull 😃	!', {
            position: "top-center",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(function(){navigate('/signin')},1000);
        } else {
          toast.error("User  Already Exists!");
        }
      } catch (error) {
        console.log(error);
        toast.error('😬	Gadbad Hai \n Re Baba 😬	!', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        
      }
    };

    const handleChange=(e)=>{
      setFormData(
        {
          ...formData,
          [e.target.id]:e.target.value
        });
        console.log(formData);
        
    
  
    };

  return (
  <div>
    <section className="bg-gray-50 dark:bg-gray-900 w-full flex justify-center my-10">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow dark:border w-full md:w-3/5 md:w-1/2 lg:w-2/5 p-10">
            <h1 className=" uppercase text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register 
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-4/5" action="#">
            {/* Name */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Name:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Name' name='name' id='name' required/>
            </div>
            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Email:</label>
              <input onChange={handleChange}  className='p-3 rounded-lg ' type='text' placeholder='Enter Your Email' name='email' id='email' required/>
            </div>

             {/* Password */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Password:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Password' name='password' id='password' required/>
            </div>

             {/* Phone Number */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Phone Number:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Phone Number' name='phone'  id='phone' required/>
            </div>

  {/* Answer */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Question:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='What is your nickname' name='answer' id='answer' required/>
            </div>
  {/* Address */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Address:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Address' name='address' id='address' required/>
            </div>
               
               
              <div className='text-center'>
              <button type="submit" className=" rounded-full p-3 w-full  cursor-pointer  hover:bg-slate-200  font-bold text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:opacity-70 uppercase">REGISTER</button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link className='no-underline' to="/signin">Login here</Link>
              </p>
            </form>
      </div>
    </section>
  </div>
  )
  }
  export default Signup
