import React, { useEffect, useState } from 'react';
import './product.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToBuyNow, addToCart } from '../../../redux/slice/user/cartReducer'
import { setCartToggle } from '../../../redux/slice/toggleReducer'
import { getProduct } from '../../../redux/slice/user/productReducer';
import { getCategory } from '../../../redux/slice/admin/categoryReducer';
import { ButtonToolbar, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {Currency} from '../../Currency';
import Spinner from '../../Spinner';



function Product() {
  const [category,setCategory] = useState("");
  const [search,setSearch] = useState("")
  const navigate = useNavigate();
   const dispatch = useDispatch();
     const products = useSelector((state)=> state.productReducer.product);
     const categorys = useSelector((state) => state.categoryReducer.category);
     let loading = useSelector((state)=> state.productReducer.isLoading);

     

     const cart = (data)=>{
      dispatch(addToCart(data))
     }

     

    //  onClick={()=> dispatch(setCartToggle(false))} onWheel={()=> dispatch(setCartToggle(false))}
    const buyOrder = (product)=>{
      dispatch(addToBuyNow(product))
      dispatch(setCartToggle(false))
      navigate(`/p/${product.product}`)
    }

    useEffect(()=>{
      dispatch(getCategory());
     },[]);

     
     useEffect(()=>{
      loading = true
      dispatch(getProduct({
        category,
        search,
      })) 
     },[search,category])
  return (
    <Container className='product-container'>   
<h1 class="products-heading"> Products</h1>
        
        <div className='product-bar'>

        <Form.Select
        aria-label="Default select example"

        value={category}
        onChange={(e) =>{setCategory(e.target.value);setSearch("")}}
        className="shadow-none text-center"
        style={{
          width: "250px"
        }}
      >
        <option value="">Select catageory</option>
        {/* <option value="" >All</option> */}
        {categorys.length > 0 &&
          categorys.map((item, index) => {
            return (
              <option value={item.category} key={index}>
                {item.category}
              </option>
            );
          })}
      </Form.Select>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
          <Form.Control
          type="search"
          placeholder="Search product"
          value={search}
           onChange={(e) => setSearch(e.target.value)}
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            className='shadow-none'
          />
        </InputGroup>
      </ButtonToolbar>
</div>
<Row className='justify-content-center'>

  {
    loading ? <div className="d-flex justify-content-center"><Spinner  width={"2rem"}/></div> : products.map((product,index)=>{
      return <Col sm={6} md = {6} xl={4} xxl={3} className="product-card " key={index}>
    <div>
    <img src={product.image} alt={product.product}/>
      <h3>{product.product}</h3>
      <p>Amount : <Currency width={"1.2rem"}/>{product.amount}{" "}/{product.unit}</p>
      {
        product.availableInStock < 10 && product.availableInStock > 0 ? <p style={{
          color : "red",
        }} >only {product.availableInStock} stock available</p>: product.availableInStock === 0 ? <p style={{color : "red" }} >Out of stock</p> : <p style={{color : "blue"}}>{product.availableInStock} stock is available</p>
      }
      <Button variant="secondary"  className='product-button' disabled={product.availableInStock === 0 ? true : false} onClick={()=> cart(product)}>Add to cart</Button>
      <Button variant="secondary" className='product-button ms-1'   disabled={product.availableInStock === 0 ? true : false} onClick={()=> buyOrder(product)}> Buy Now</Button>
    </div>
  </Col>
  })
  }
  

           
        
</Row>
</Container>

  )
}

export default Product