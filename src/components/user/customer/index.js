import React from 'react';
import './customer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function index() {

    let data = [
        {
            img:"image/pic-1.png",
            name :"john",
            para :"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
            star : 4
        },
        {
            img:"image/pic-2.png",
            name :"Marey",
            para :"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
            star : 4
        },
        {
            // img:"image/loading.svg",
            img:"image/pic-3.png",
            name :"Suriya",
            para :"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
            star : 4
        },
        // {
        //     img:"image/pic-4.png",
        //     name :"Sara",
        //     para :"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
        //     star : 4
        // },
    ]

  return (
    <Container>

    <h1 class="heading"> Customer's <span>review</span> </h1>

    <Row className='customer-container'>

       

            {
                data.map(({img,name,para,star},index)=>{
                    return <Col sm={6} md = {3} xl={3} key={index} className="customer-card">
               
                  <img src={img} alt={name}/>
             <h3>{name}</h3>
                    

                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <p>{para}</p>
               
                </Col>
    
                })
            }
           
        

    </Row>

</Container>
  )
}

export default index