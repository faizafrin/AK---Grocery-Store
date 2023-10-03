import React from 'react';
import './customer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function index() {

    let data = [
        {
            img:"image/pic-1.png",
            name :"Michael",
            para :"AK Grocery stands out amongst all the other online grocery stores in Chennai because it has a wide variety of items at affordable prices with a friendly and timely service. Finally we found fresh, quality and affordable groceries here... Thank you AK Grocery for your service at Chennai.",
            
            star : 4
        },
        {
            img:"image/pic-2.png",
            name :"Jessy",
            para :"My experience with this grocery store has always been pleasant and the staff is super friendly. They always deliver high quality items at reasonable prices. I purchase my weekly groceries at AK Grocery only and I am happy to be their customer for almost an year now.",
            star : 4
        },
        {
            // img:"image/loading.svg",
            img:"image/pic-4.png",
            name :"Zarah",
            para :"I had to walk to the nearby store at least twice a day to purchase and fill in the empty grocery jars in my home. It's probably a good thing that I found this website. Its really amazing to shop with Akgrocery.com when you want something fast. Customer service is also great.",
            star : 5
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