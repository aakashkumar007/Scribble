/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";
import { useAuth } from '../context/auth'; // Import the useAuth hook

const Profile = () => {
  const [auth, setAuth] = useAuth(); // Get the auth state and setAuth function
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      setFormData(auth.user); // Prefill the form with the user's data
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:4000/api/auth/update", formData);

      if (res.data.success) {
        toast.success('Profile Updated Successfully!', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        const updatedUser = res.data.updatedUser;
        setAuth({ ...auth, user: updatedUser }); // Update the auth state with new user data
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: updatedUser })); // Update localStorage
      } else {
        toast.error("Profile Update Failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!', {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
    <div>
    

      <Link className='p-2 text-xl font-serif' to="/dashboard/user"><TiArrowBackOutline className='' /> Go back to Dashboard</Link>
    </div>
      <section className="bg-gray-50 dark:bg-gray-900 w-full flex justify-center my-10">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow dark:border w-full md:w-3/5 md:w-1/2 lg:w-2/5 p-10">
          <h1 className="uppercase text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-4/5" action="#">
            {/* Name */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Name:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Name' name='name' id='name' value={formData.name || ''}  />
            </div>
            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Email:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Email' name='email' id='email' value={formData.email || ''}  />
            </div>
            {/* Password */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Password:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='password' placeholder='Enter Your Password' name='password' id='password' value={formData.password || ''}  />
            </div>
            {/* Phone Number */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Phone Number:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Phone Number' name='phone' id='phone' value={formData.phone || ''}  />
            </div>
            {/* Address */}
            <div className='flex flex-col gap-1'>
              <label className='ml-1'>Address:</label>
              <input onChange={handleChange} className='p-3 rounded-lg ' type='text' placeholder='Enter Your Address' name='address' id='address' value={formData.address || ''}  />
            </div>
            <div className='text-center'>
              <button type="submit" className="rounded-full p-3 w-full cursor-pointer hover:bg-slate-200 font-bold text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:opacity-70 uppercase">UPDATE</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile;
