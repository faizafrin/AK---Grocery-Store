import React from 'react'
import Inr from '../assets/currency.svg'
// import inr from '../assets/Indian.svg'

function Currency({width,color}) {
  return (
   <img src={Inr} alt="currency"  style={{
    width : width,
    color : color,
    
   }}/>
  )
}


function Currency1({width,color}) {
  return (
   <img src='https://cdn.iconscout.com/icon/premium/png-512-thumb/rupee-2475070-2056077.png' alt="currency"  style={{
    width : width,
    color : color,
    
   }}/>
  )
}
export {Currency,Currency1}