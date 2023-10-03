import React from 'react';
import './contact.css'
import Container from 'react-bootstrap/Container';


function index() {
  return (

    <Container className='contact-container'>
       <h1 class="heading"> Contact <span>me</span> </h1>

 
        <div  className="Contact-two">
          <h4>Contact us</h4>
          <p>We're open for any suggestion or just to have a contact</p>
          <div class="contact-detail">
          <p class="fa fa-map-marker"></p>
            
            
              <p><span>Address:</span> 2/3 New street, Chennai 001.</p>
          
          </div>
          <div class=" contact-detail">
          <p class="fa fa-phone "></p>
            
              <p><span>Phone:</span> <a href="tel://1234567920">81********</a></p>
           
          </div>
          <div class=" contact-detail">
          <p class="fa fa-paper-plane"></p>
            
              <p><span>Email:</span> <a href="mailto:info@yoursite.com">akgstore@gmail.com</a></p>
          
          </div>
      
        </div>
    

    </Container>

  )
}

export default index