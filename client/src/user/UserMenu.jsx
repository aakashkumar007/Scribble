import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
        <div>
     <h1 className='text-center'> Dashboard </h1>
     <div>
      <ul className="p-2 m-2 list-none  font-mono font-extrabold ">
        <li><NavLink className="no-underline" to='/dashboard/user/profile'>Profile</NavLink></li>
        <li><NavLink className="no-underline" to='/dashboard/user/orders'>Orders</NavLink></li>
      </ul>
     </div>
    </div>
    </>
  )
}

export default UserMenu