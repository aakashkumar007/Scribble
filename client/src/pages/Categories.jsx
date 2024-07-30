import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

  return (
    <>
        <h1>All Categories</h1>
        <div className='min-h-[520px]'>
        {
            categories?.map((c)=>(
                <li key={c._id}>
                <Link to={`/categories/${c.slug}`}>
                {c.name}
                </Link>
                </li>
            ))
        }
        </div>
    </>
  )
}

export default Categories