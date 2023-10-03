import React from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux';
// import { setCartToggle ,setMenuToggle} from '../../../redux/slice/user/toggleReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCartToggle, setMenuToggle } from '../../../redux/slice/toggleReducer';
import Toast from '../../toast';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartLength = useSelector((state)=> state.cartReducer.cart.length);
    const cartToggle = useSelector((state)=> state.toggleReducer.cartToggle);
    const menu = useSelector((state)=> state.toggleReducer.menuToggle);
    const StatusToken = useSelector((state)=> state.statusReducer.token);
    let token = window.localStorage.getItem("token") || StatusToken

    const navLinkStyle = { color: ' #ff7800'}

    const toggle = ()=>{
         if(cartLength === 0){
          if(cartToggle === true){
               return dispatch(setCartToggle(false));
          }
        Toast.fire({ icon: 'warning', title: "Add at least one item in cart" })
        
      }else{
        dispatch(setCartToggle(!cartToggle))
      }
      // {toggle :!cartToggle, cartItem : cartLength }
    }
  return (
    <header className="user-header">

    <div className="logo"> <i className="fas fa-shopping-basket"></i> AK Grocery</div>
    
    <div className="user-navbar" id={menu ? null : "hide"}>
        <div className='nav'>
        <span className="fa fa-times" id='menu-btn'  onClick={()=> dispatch(setMenuToggle(!menu))}></span>
        <NavLink to="/" style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> dispatch(setMenuToggle(false))}><i class="fas fa-house-user"></i> Home</NavLink>

        <NavLink to="/product" style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> dispatch(setMenuToggle(false))}><i class="fa-solid fa-list"></i> Products</NavLink>
{
  token ?   <NavLink to="/your-order" style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> dispatch(setMenuToggle(false))}><i class="fa fa-shopping-bag"></i> Your Orders</NavLink> : null
}
{/* {
  token ?   <NavLink to="/product"  style={({ isActive }) => isActive ? navLinkStyle : null} onClick={()=> dispatch(setMenuToggle(false))}><i class="fas fa-user"></i> Profile</NavLink> : null
} */}
  
        
        </div>
    </div>
    
    <div className="icons">
        <span className="fas fa-shopping-cart carts" id="cart-btn" title='Cart' onClick={toggle}><span> {cartLength}</span></span>
        {
  token ?   <span className="fas fa-user kk" id="login-btn" onClick={()=>navigate('/profile')}></span> : null
}
        
        {
          token ? <span className="fas fa-sign-out-alt kk" title='Sign out' onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("mobile");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("id");
            navigate("/login")
                    }}></span> :  <span className="fas fa-sign-in-alt kk" id="login-btn" title='Sign in' onClick={()=>{
                      navigate("/login")
                              }} ></span>
        }
       
        <span className="fas fa-bars kk" id="menu-btn" onClick={()=> dispatch(setMenuToggle(!menu))}></span>
    </div>
    
 
    
    
    
    
    </header>
  )
}

export default Navbar