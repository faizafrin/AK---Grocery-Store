import React from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux';
import { setMenuToggle} from '../../../redux/slice/toggleReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change,setChange] = useState(true);
    const menu = useSelector((state)=> state.toggleReducer.menuToggle);
   
const navLinkStyle = { color: ' #ff7800'}
  return (
    <header className="header">

    <div className="logo"> <i className="fas fa-shopping-basket"></i>  </div>
    {/* startAdornment={
      <InputAdornment position="start">
        
      </InputAdornment>
    } */}
  
    
    <div className="navbar" id={menu ? null : "hide"}>
        <div className='nav'>
        <span className="fa fa-times" id='menu-btn'  onClick={()=> dispatch(setMenuToggle(!menu))}></span>
        <NavLink to="/dashboard" style={({ isActive }) =>  isActive ? change ? navLinkStyle : null : null} onClick={()=> {dispatch(setMenuToggle(false));setChange(true)}}><i class="fa-solid fa-gauge-high"></i> Dashboard</NavLink>
        <NavLink to="/dashboard/addCategories" style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> {dispatch(setMenuToggle(false));setChange(false)}}><i class="fa-solid fa-list-check"></i> Catageries</NavLink>
        <NavLink to="/dashboard/addProduct" style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> {dispatch(setMenuToggle(false));setChange(false)}}><i class="fa-solid fa-clipboard-list"></i> Product</NavLink>
        <NavLink to="/dashboard/user"style={({ isActive }) => isActive ? navLinkStyle : null} ocClick = {()=>setChange(false)}><i class="fa-solid fa-user"></i> User</NavLink>
 
        </div>
    </div>
    
    <div className="icons">
        <span className="fas fa-user kk" title='User' id="login-btn"></span>
        <span className="fas fa-sign-out-alt kk" title='Sign out' onClick={()=>{
localStorage.removeItem("token");
localStorage.removeItem("name");
localStorage.removeItem("email");
localStorage.removeItem("mobile");
localStorage.removeItem("isAdmin");
localStorage.removeItem("id");
navigate("/login")
        }}></span>
        
        <span className="fas fa-bars kk" id="menu-btn" onClick={()=> dispatch(setMenuToggle(!menu))}></span>
    </div>
    
 
    
    
    
    
    </header>
  )
}

export default Navbar

