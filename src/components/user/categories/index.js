import React from 'react'
import './categories.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function index() {

    let data = [
        {
            img:"image/cat-1.png",
            title :"Vegitables",
            offer :"upto 45% off",
        },
        {
            img:"image/cat-2.png",
            title :"Fruits",
            offer :"upto 45% off",
        },
        {
            img:"image/cat-3.png",
            title :"Dairy & Eggs",
            offer :"upto 45% off",
        },
        {
            img:"image/cart-4.jpg",
            title :"Household Care",
            offer :"upto 45% off",
        },        
    ]

  return (
    <Container>

    <h1 class="heading"> Product <span>categories</span> </h1>

    <Row className='categories-container'>

       {
        data.map(({img,title,offer},index)=>{
            return  <Col sm={6} md = {4} xl={3} key={index} className="categories-card">   
            <img src={img} alt={title}/>
             <h3>{title}</h3>
                <p>{offer}</p>
                <Button variant="secondary" className='mb-2'> <Link to="/product">Shop now</Link></Button>
            
            </Col>
        })
       }
    </Row>
</Container>

  )
}

export default index