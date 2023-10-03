import React, { useState } from 'react'

function PreviewImage({file,name}) {
  
// convert file object to base64 image
    const [preview,setPreview] = useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
        setPreview(reader.result);
    } 
  return (
    <div className='d-flex justify-content-center align-items-center'>
       {preview ? <> <img src={preview} alt="preview" style={{
            width : "4.5rem"
        }}  />
        {/* <p >{name}</p> */}
         </>:  <h6>Loading</h6>}
    </div>
   
  )
}

export default PreviewImage