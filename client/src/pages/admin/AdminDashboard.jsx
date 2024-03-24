import React from 'react'
import Category from './Category.jsx'
import Product from './Product.jsx'
import UpdateProduct from './UpdateProduct.jsx'

const AdminDashboard = () => {
  return (
    <>
    <div className='min-h-lvh'>
    <h1 className='text-slate-600'>Admin Panel</h1>
    <Category/>
    <Product/>
    
    </div>
    </>
  )
}

export default AdminDashboard