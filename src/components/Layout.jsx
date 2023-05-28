import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import untitled from '../assets/Untitled.png';

const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
    <div className="bg-cover min-h-screen" style={{
      backgroundImage: `url(${untitled})`
    }}>
      <Header />
      <Outlet />
    </div>
      
    </div>
  )
}

export default Layout
