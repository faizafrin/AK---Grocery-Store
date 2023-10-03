import React from 'react'
import Carousel from 'react-bootstrap/Carousel';


function Silder() {

  const banner = [
   
    {
      name : "img1",
      link :  "https://img.freepik.com/free-vector/gradient-supermarket-sale-background_23-2149380627.jpg",
    },
    {
      name : "img2",
      link :  "https://img.freepik.com/free-vector/hand-drawn-local-market-facebook-template_23-2149415923.jpg",
    },
    {
      name : "img3",
      link :  "https://img.freepik.com/free-psd/healthy-food-landing-page-template_23-2149586037.jpg",
    },
    {
      name : "img3",
      link :  "https://img.freepik.com/free-vector/hand-drawn-supermarket-sale-background_23-2149406388.jpg",
    },
    {
      name : "img4",
      link :  "https://img.freepik.com/free-psd/healthy-food-social-media-promo-template_23-2149586060.jpg?size=626&ext=jpg",
    },


  ];

  const style = {
    width : "100%",
    height : "700px",
  }

  return (
    <Carousel>
    {
        banner.map(({name,link},index)=>{
         return <Carousel.Item key={index}>
        <img
          className="d-block"
          style={style}
          src={link}
          alt={name}
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
        })
      }

    </Carousel>
  )
}

export default Silder