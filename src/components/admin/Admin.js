import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './header';

function Admin() {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
    
  )
}

export default Admin