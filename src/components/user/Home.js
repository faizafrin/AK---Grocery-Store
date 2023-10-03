import React, { useEffect } from 'react'
import Feature from './feature';
import Categories from './categories';
import Customer from './customer';
import Contact from './contact';
import Footer from './footer';
function Home() {
  return (
    <>
    <Categories/>
    <Feature/>
    <Customer/>
    <Contact/>
    <Footer/>

    </>
  )
}

export default Home