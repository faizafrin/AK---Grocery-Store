import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header';
import Cart from './cart';

function User() {
  return (
    <>
    <Header/>
    
    <Outlet/>
    
    <Cart/>
    </>
  )
}

export default User