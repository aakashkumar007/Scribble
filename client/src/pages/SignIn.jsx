import React from 'react'
import {Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

const SignIn = () => {

  const [formData,setFormData] = useState({})
  const navigate =useNavigate();
  const [auth,setAuth] = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login",formData);
      if (res.data.success) {
        toast.success('😃	Login \n Successfully 😃', {
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

          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token}
            );
            localStorage.setItem("auth",JSON.stringify(res.data));
        setTimeout(function(){navigate('/')},2000);
       
      } else {
        console.log(res.data.message);
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
    <>
     <div className="min-h-lvh m-2">
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center p-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full pr-8 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
            <h1 className=" uppercase text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              SIGN IN
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pr-5" action="#">
           
            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Email:</label>
              <input onChange={handleChange}  className='p-3 rounded-lg ' type='text' placeholder='Enter Your Email' name='email' id='email' required/>
            </div>

             {/* Password */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Password:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='password' placeholder='Enter Your Password' name='password' id='password' required/>
            </div>
               
               
              <div className='text-center'>
              <button type="submit" className=" rounded-full p-3 w-full  cursor-pointer  hover:bg-slate-200  font-bold text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:opacity-70 uppercase">Sign In</button>
              </div>  
             <div>
             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account? <Link className='no-underline' to="/signup">Sign Up</Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Forget Your Password? <Link className='no-underline' to="/forgotPassword">Forgot Password</Link>
              </p>
             </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
    </>
  )
}

export default SignIn