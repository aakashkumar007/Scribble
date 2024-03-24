import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from '../../context/auth.jsx';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    toast.success('😃	LogOut \n Successfully 😃	!', {
      position: "top-center",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(function () { navigate('/') }, 1000);

  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showMenu]);

  useEffect(() => {
    if (windowSize < 768) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [windowSize])



  return (
    <header className='bg-purple-600 p-2 flex justify-between items-center mb-2 shadow-sm shadow-purple-500'>
      <div className='flex items-center text-white'>
        <Link to="/">
          <TiShoppingCart className='mx-2 text-white text-6xl hover:bg-slate-200 hover:text-blue-500 rounded-full p-2' />
        </Link>
        <Link to='/' className='text-white font-extrabold text-3xl hover:underline'>
          Ecommerce
        </Link>
      </div>
      <nav className='flex items-center flex-col mr-8'>
        <div className='md:hidden cursor-pointer mr-3' onClick={() => setShowMenu(!showMenu)} >
          <GiHamburgerMenu />
        </div>
        {showMenu && <ul className='flex list-none md:flex-row flex-col absolute md:relative mt-10 md:mt-0 gap-6 md:gap-0 bg-purple-600 md:bg-transparent p-2 rounded-md justify-center items-center'>
          <li className='font-bold no-underline text-white mx-2 '>
            <Link className='text-white no-underline hover:bg-white hover:text-blue-600  p-2 rounded-lg' to='/'>Home</Link>
          </li>
          <li className='font-bold mx-2 '>
            <Link className='text-white no-underline hover:bg-white hover:text-blue-600  p-2 rounded-lg' to='/contact'>Contact</Link>
          </li>
          <li className='font-bold mx-2  '>
            <Link className='text-white no-underline hover:bg-white hover:text-blue-600  p-2 rounded-lg' to='/about '>About</Link>
          </li>
          {
            !auth.user ? (
              <>
                <div className='flex gap-4 m'>
                  <Link to='/signup' className='bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-md hover:shadow-black hover:bg-slate-200 '>
                    Sign Up
                  </Link>
                  <Link to='/signin' className='bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-md hover:shadow-black hover:bg-slate-200 '>
                    Sign In
                  </Link>
                </div>
              </>
            ) : (<>
              <div>
               <Link to={auth.user.role==1 ? "/AdminDashboard/admin" : "/dashboard/user"} className='mr-3 bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-md hover:shadow-black hover:bg-slate-200'>
                  {auth.user.name}
                </Link>
              
              <Link onClick={handleLogOut} className='bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-md hover:shadow-black hover:bg-slate-200 '>
                  Logout
                </Link>
              </div>
            </>)
          }    
        </ul>}
      </nav>
    </header>
  )
}

export default Header