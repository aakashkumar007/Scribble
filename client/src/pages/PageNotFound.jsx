import React from 'react'
import {Link} from "react-router-dom"
import { PiPlanetDuotone } from "react-icons/pi";

const PageNotFound = () => {
  return (
    <>
   <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <PiPlanetDuotone className="text-9xl text-yellow-400" />
  <h1 className="text-5xl font-bold text-gray-800 mt-4">404</h1>
  <p className="text-4xl font-extrabold text-gray-800 mt-2">Page Not Found!</p>

 <Link to="/"><button className='rounded-lg p-3 cursor-pointer  hover:bg-slate-200  font-semibold text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:opacity-70 '>GO BACK</button></Link>
</div>
    </>
  )
}

export default PageNotFound