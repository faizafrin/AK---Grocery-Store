import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button} from 'react-bootstrap';
import {Currency1} from '../../Currency';
import './item.css'
import { buyNowDecrement, buyNowIncrement } from '../../../redux/slice/user/cartReducer';

function ProductItem() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.cartReducer.buyNow);
    const {image, product, amount,category,dummyQuantity,dummyTotal,unit} = products;

    const increment = (quantity)=>{
      dispatch(buyNowIncrement(quantity));
    }

    const decrement = (quantity)=>{
      dispatch(buyNowDecrement(quantity));
    }
    const buyOrder = ()=>{
      navigate('/place-order/buyItems')
    }
    useEffect(()=>{
      
if(Object.keys(products).length === 0){
  navigate('/product')
}
    },[])
  return (
    <div className='productItem-container'>
        <div className='productItem-leftContainer'>
            <img src={image} alt={product}/>
        </div>
        <div className='productItem-rightContainer'>
       <div>
       <h6 className='mb-3'>Category : {category}</h6>
            <h5 className='mb-3'>Product : {product}</h5>
            <h6>Amount : <Currency1 width={"1.5rem"} color = {"red"} />{amount}/{unit}</h6>
          
              <div className='incDec'>
              Quantity :  <i class="fas fa-plus " onClick={()=>increment(dummyQuantity)}></i><span>{dummyQuantity} </span><i class="fas  fa-minus" onClick={()=> decrement(dummyQuantity)}></i>
              </div>
              
              <h6 className='mt-3'>Total Amount : <Currency1 width={"1.5rem"} color = {"red"} />{dummyTotal}</h6>
             <Button variant='secondary' onClick={buyOrder}><i class="fa fa-bolt "></i> Buy now</Button> <Button variant='secondary' onClick={()=> navigate("/product")}><i class="fa-solid fa-angles-left"></i> Back</Button>
       </div>
        </div>
    </div>
  )
}

export default ProductItem