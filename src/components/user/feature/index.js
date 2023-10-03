import React from 'react'
import './feature.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function index() {
let data = [
    {
        img:"image/feature-img-1.png",
        title : "Fresh and organic",
        para : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
    {
        img:"image/feature-img-2.png",
        title : "Free delivery",
        para : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
    {
        img:"image/feature-img-3.png",
        title : "Easy payments",
        para : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
]

  return (
    <Container>

    <h1 class="heading"> Our <span>features</span> </h1>
        <Row className='feature-container'>
        {
            data.map(({img,title,para})=>{
                return <Col md = {4} xl={3} className="feature-card">
               
               <img src={img} alt={title}/>
                <h3>{title}</h3>
                <p>{para}</p>
              
            </Col>
            })
        }
        </Row>
</Container>
  )
}

export default index