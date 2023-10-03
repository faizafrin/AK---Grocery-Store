import React from 'react'
import './orderSuccess.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/slice/user/cartReducer';
function OrderSuccess() {
 
 
  const navigate = useNavigate();
 const dispatch = useDispatch()

  return (
    <>
      <div className='ffs'>
        <div className="cardss">
          <div className='ssk'>
            <span className="checkmark">✓</span>
          </div>
          <h1 className='h1'>Success</h1>
          <h6>When your order is delivery invoice send in your register email address</h6>
          <button className='ww' onClick={() => {
            dispatch(clearCart())
            navigate('/product')
          }}>Continue to shopping</button>
        </div>
      </div>
    </>
  )
}

export default OrderSuccess