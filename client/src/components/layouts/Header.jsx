import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from '../../context/auth.jsx';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import useCategory from '../../hooks/useCategory.js';
import { gsap } from 'gsap';
import { IoIosLogOut } from "react-icons/io";
import { useCart } from '../../context/Cart.jsx';
import { Avatar, Badge, Space } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  
  const categories = useCategory();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [cartLength, setCartLength] = useState(0);

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success('😃 LogOut \n Successfully 😃!', {
      position: "top-center",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => { navigate('/') }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 768) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [windowSize]);

  useEffect(() => {
    gsap.fromTo('.nav-item', { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 });
    gsap.fromTo('.logo-item, .header-icon, .header-username, .header-logout', { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 });

    const logoAnimation = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    logoAnimation
      .to('.header-icon', { rotation: 360, duration: 2, ease: 'power1.inOut' })
      .to('.header-icon', { rotation: 0, duration: 0 });

    const textAnimation = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    textAnimation
      .to('.logo-item', { scale: 1.3, duration: 0.5, ease: 'power1.inOut' })
      .to('.logo-item', { scale: 1, duration: 0.5, ease: 'power1.inOut' });
  }, [showMenu]);

  useEffect(() => {
    if (auth?.user?._id) {
      const cartKey = `cart_${auth.user._id}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCartLength(storedCart.length);
    }
  }, [auth, cart]);

  return (
    <header className='bg-gradient-to-r from-purple-600 to-blue-600 p-2 flex justify-between items-center mb-2 shadow-md'>
      <div className='flex items-center text-white'>
        <Link to="/">
          <TiShoppingCart className='header-icon mx-2
          hover:bg-teal-300 text-blue-500 text-6xl rounded-full p-2 transition-transform transform hover:scale-110' />
        </Link>
        <Link to='/' className='logo-item text-teal-600 font-extrabold text-3xl no-underline ml-2'>
          Scribble
        </Link>
      </div>
      <nav className='flex items-center flex-col md:flex-row'>
        <div className='md:hidden cursor-pointer mr-4' onClick={() => setShowMenu(!showMenu)}>
          <GiHamburgerMenu className='header-icon text-sky-500 text-2xl' />
        </div>
        {showMenu && (
          <ul className='flex bg-slate-100 list-none md:flex-row flex-col absolute md:relative top-12 md:top-0 mt-4 mr-16 md:mt-0 gap-6 md:gap-4 p-4 rounded-lg justify-center items-center z-50'>
            <li className='nav-item font-bold no-underline text-white mx-2 transition-transform transform hover:scale-110'>
              <Link className='text-blue-500 no-underline hover:bg-white hover:text-blue-600 p-2 rounded-lg' to='/'>Home</Link>
            </li>
            <li className='nav-item font-bold mx-2 relative group transition-transform transform hover:scale-110'>
              <span className='text-blue-500 no-underline hover:bg-white p-2 rounded-lg cursor-pointer'>
                <Link to={"/categories"} className='text-blue-500 no-underline hover:text-blue-600'>Category</Link>
              </span>
              <ul className='absolute hidden group-hover:block mt-2 rounded-lg z-50'>
                {categories.map((category) => (
                  <li className='bg-blue-950 list-none p-2 hover:underline text-white' key={category.id}>
                    <Link className='no-underline text-white bg-blue-950' to={`/categories/${category.slug}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className='nav-item font-bold mx-2 transition-transform transform hover:scale-110'>
              <Link className='text-blue-500 no-underline hover:bg-white hover:text-blue-600 p-2 rounded-lg' to='/contact'>Contact</Link>
            </li>
            <li className='nav-item font-bold mx-2 transition-transform transform hover:scale-110'>
              <Badge 
                count={auth?.token && cartLength} overflowCount={9} showZero>
                <Link className='text-blue-500 no-underline hover:bg-white hover:text-blue-600 p-2 rounded-lg' to='/cart'>
                  Cart
                </Link>
              </Badge>
            </li>
            <li className='nav-item font-bold mx-2 transition-transform transform hover:scale-110'>
              <Link className='text-blue-500 no-underline hover:bg-white hover:text-blue-600 p-2 rounded-lg' to='/about'>About</Link>
            </li>
            {!auth.user ? (
              <div className='flex gap-4'>
                <Link to='/signup' className='header-item transition-transform transform hover:scale-110 bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-lg hover:bg-slate-200'>
                  Sign Up
                </Link>
                <Link to='/signin' className='header-item transition-transform transform hover:scale-110 bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-lg hover:bg-slate-200'>
                  Sign In
                </Link>
              </div>
            ) : (
              <div className='flex gap-4'>
                <Link to={auth.user.role === "1" ? "/AdminDashboard/admin" : "/dashboard/user"} className='header-username transition-transform transform hover:scale-110 bg-white text-purple-700 font-bold no-underline uppercase py-1 px-2 rounded hover:shadow-lg hover:bg-slate-200'>
                  {auth.user.name}
                </Link>
                <Link onClick={handleLogOut} className='header-logout bg-white text-purple-700 no-underline uppercase py-1 px-2 rounded hover:shadow-lg hover:bg-blue-500 hover:text-white'>
                  <IoIosLogOut className='transition-transform transform hover:scale-110 font-extrabold text-xl' />
                </Link>
              </div>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
