import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { ToastContainer,  } from 'react-toastify';

const Layout = ({children}) => {
  return (
    <div>
    <Header/>
    <main className='min-h-lvh'>
    <ToastContainer />
    {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout