import React from 'react'
import './cart.css';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToCart, cartIncrement, cartDecrement } from '../../../redux/slice/user/cartReducer';
import { setCartToggle } from '../../../redux/slice/toggleReducer';
import { useNavigate } from 'react-router-dom';
import Toast from '../../toast';
import {Currency} from '../../Currency'


function Cart() {
const navigate = useNavigate();
const dispatch = useDispatch();


    const cartValue = useSelector((state)=> state.cartReducer.cart);
    const total = useSelector((state)=> state.cartReducer.total);
    const cartToggle = useSelector((state)=> state.toggleReducer.cartToggle);
    

    //  onMouseLeave={()=> dispatch(setCartToggle(!cartToggle))}

const del = (data)=>{
    if(cartValue.length === 1){
        dispatch(setCartToggle(!cartToggle))
    }
    // cartToggle
    dispatch(deleteToCart(data))
    
}
const increment = (data)=>{
    dispatch(cartIncrement(data))
    
}
const decrement = (data)=>{
    dispatch(cartDecrement(data))
    
}

const handleChange = ()=>{
   if(cartValue.length > 0){
    dispatch(setCartToggle(false))
    navigate('/place-order/cartItems')
   }else{
    Toast.fire({
        icon: "warning",
        title: "select minimum one product",
      });
   }
}
// onHide={()=> dispatch(setCartToggle(false))} 

    return (
        <>
                <div className='cart' id={cartToggle ? (null):("cart")} >
                    <div className='cart-container'>
                    {
                        cartValue.length > 0 && cartValue.map(({ image, product, amount, quantity,_id,dummyQuantity,dummyTotal,unit,availableInStock }, index) => {
                            return <div key={index} className='shopping-card'>
                                <img src={image} alt={product} />
                                <div>
                                    <h3>{product}</h3>
                                    
                                    
                                    <span class="quantity">qty : <i className='qty-icon' onClick={()=> increment({ image, product, amount, dummyQuantity,_id ,dummyTotal,quantity,availableInStock})} class="fas fa-plus"></i> {dummyQuantity} {unit} <i onClick={()=> decrement({ image, product, amount,dummyQuantity, _id,dummyTotal })} class="fas  fa-minus"></i></span>
                                    <span class="price"><span className='total-hide'>Total :</span><Currency width={"1.4rem"}/>{dummyTotal}</span>
                                </div>

                                <i onClick={()=> del({ image, product, amount, quantity, _id,dummyQuantity ,dummyTotal ,availableInStock})} class="fas fa-trash"></i>
                            </div>
                        })
                    }
                    </div>
                    <div className="total">
                        <div > Total : <Currency width={"2rem"}/>{total}/- </div>
                        <Button variant="secondary" className='mb-2' onClick={handleChange}>Checkout</Button>
                    </div>
                </div>
        </>
    )
}

export default Cart;