import axios from 'axios';
import React, { useState } from 'react'
import Loading from '../../Loading'
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import { otpVerification, sendOtp } from '../../../utils/api';
import Toast from '../../toast';
import './otp.css'
import Spinner from '../../Spinner'
function Otp({ show, handleClose ,data, values}) {

  let navigate = useNavigate();

    const [otp,setOtp] = useState({
        first : '',
        second : '',
        third : '',
        fourth : '',
    })

    const [loading,setLoading] = useState({
      verifyLoading : false,
     resendLoading : false
    })

    const numValidate = (e)=>{
        

if(e.target.name === "first"){
   
    if(otp.first.length === 0){
          setOtp({...otp,first:e.target.value})
          const form = e.target.form;
          const index = [...form].indexOf(e.target);
          form[index + 1].focus();
    }else{
        // setOtp({...otp,first:''})
    }
}else if(e.target.name === "second"){
    if(otp.second.length === 0){

        setOtp({...otp,second:e.target.value})
        const form = e.target.form;
    const index = [...form].indexOf(e.target);
    form[index + 1].focus();
  }else{
    // setOtp({...otp,second:''})
    // const form = e.target.form;
    // const index = [...form].indexOf(e.target);
    // console.log(index)
    // form[index - 1].focus();
}
}else if(e.target.name === "third"){
    if(otp.third.length === 0){
        setOtp({...otp,third:e.target.value})
        const form = e.target.form;
    const index = [...form].indexOf(e.target);
    form[index + 1].focus();
  }else{
    // setOtp({...otp,third:''})
    // const form = e.target.form;
    // const index = [...form].indexOf(e.target);
    // console.log(index)
    // form[index - 1].focus();
}
}else if(e.target.name === "fourth"){
    if(otp.fourth.length === 0){
        setOtp({...otp,fourth:e.target.value})
    //     const form = e.target.form;
    // const index = [...form].indexOf(e.target);
    // console.log(index)
    // form[index + 1].focus();
  }else{
    // setOtp({...otp,fourth:''})
    // const form = e.target.form;
    // const index = [...form].indexOf(e.target);
    // console.log(index)
    // form[index - 1].focus();
}
  e.target.value = ''
}
    }
    const keyevent = (e)=>{

if(e.code === "Backspace"){
          
if(e.target.name === "first"){
        setOtp({...otp,first:''})
}else if(e.target.name === "second"){
    setOtp({...otp,second:''})
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    form[index - 1].focus();
}
else if(e.target.name === "third"){
    setOtp({...otp,third:''})
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    form[index - 1].focus();
}else if(e.target.name === "fourth"){
    setOtp({...otp,fourth:''})
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    form[index - 1].focus();
}
  e.target.value = ''      
        }

    }
const handleSubmit = async(e)=>{
    e.preventDefault();
if(otp.first.length ===1){
if(otp.second.length ===1){
    if(otp.third.length ===1){
        if(otp.fourth.length ===1){
          let pin = [otp.first,otp.second,otp.third,otp.fourth].map(Number).join('')
          try {
            setLoading({...loading,verifyLoading : true})
            let {status,data} = await axios.post(otpVerification,{otp : pin,data  :values.values }) 
            setLoading({...loading,verifyLoading : false})
             if(status === 201){
              Toast.fire({
                    icon: "success",
                    title: data.message,
                  });
                  navigate("/login");
             }

          } catch (error) {
            setLoading({...loading,verifyLoading : false})
            Toast.fire({
                  icon: "warning",
                  title: error.response.data.message,
                });
          }

        }else{
            Toast.fire({
                icon: "warning",
                title: "Fourth value missing",
              });
        }
    }else{
        Toast.fire({
            icon: "warning",
            title: "Third value missing",
          });
    }
}else{
    Toast.fire({
        icon: "warning",
        title: "Sceond value missing",
      });
}
}else{
    Toast.fire({
            icon: "warning",
            title: "Enter a one time password",
          });
}
}

const resendOtp = async()=>{
  try {
    setLoading({...loading,resendLoading : true})
    let {status,data} = await axios.post(sendOtp, {email : values.values.email});
    setLoading({...loading,resendLoading : false})
    if(status === 200){
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    }
  } catch (error) {
    setLoading({...loading,resendLoading : false})
    Toast.fire({
      icon: "warning",
      title: error.response.data.message,
    });
  }
}
  return (
    <Modal
        show={show}
        size='md'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='modal'
        
      >
        {/* <Modal.Header
          closeButton
          onClick={() => {

            handleClose();
          }}
        >
          <Modal.Title><h4>Verify Your Account</h4></Modal.Title>
        </Modal.Header> */}
        <Modal.Body className='body'>
        <div className='otp'>
          <div class="Otp-container">
            <h5 className='text-center'>
            Verify Your Account
            </h5>
    
    <p className='text-center'>
      Otp send in <span className='mail'>{data.email}</span>
    </p>

    <div class="code-container">
<form onSubmit={handleSubmit}>
<input autoFocus type="number" class="code" name = "first" value={otp.first} maxLength={1}  onChange={numValidate}  onKeyDown = {keyevent}/>
    <input type="number"  class="code" name = "second" value={otp.second} maxLength={1}  onChange={numValidate}  onKeyDown = {keyevent}/>
    <input type="number" class="code" name = "third" value={otp.third} maxLength={1}  onChange={numValidate}  onKeyDown = {keyevent}/>
    <input type="number" class="code" name = "fourth" value={otp.fourth} maxLength={1}  onChange={numValidate}  onKeyDown = {keyevent}/> <br />

      <div className='d-flex justify-content-center align-items-center'>
      <button type="submit" class="btn btn-primary" disabled = {loading.verifyLoading ? true : false}>Verify</button>  {loading.verifyLoading ? <Loading padding = {"0 0 5px 0"} width={"3.2rem"}/> : null} 
      </div>
    
</form>
    </div>

   

    <small class="info d-flex align-items-center">
      If you didn't receive a code !! <strong className='resend ms-1' onClick={ loading.resendLoading ? null : resendOtp}> RESEND</strong> {loading.resendLoading ? <span className='ms-1'><Spinner width={"1rem"}/></span> : null}
    </small>

  </div>
    </div>
        </Modal.Body>
      </Modal>

  )
}

export default Otp