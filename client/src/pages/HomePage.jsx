import React from 'react'
import { useAuth } from '../context/auth'

const HomePage = () => {

  const [auth,setAuth] = useAuth()
  return (
    <div className=''>
    HomePage
    <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
  )
}

export default HomePage