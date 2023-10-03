import React from 'react';
import loading from "../assets/loading.svg";

function Spinner({width}) {
  return (
 
         <img src={loading} alt="loading" style={{
          width : width
         }} />

  )
}

export default Spinner