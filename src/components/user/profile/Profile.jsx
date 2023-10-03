import React from 'react'
import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import './profile.css'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { env } from "../../config";
import * as yup from "yup";
import Spinner from '../../Spinner';
import toast from '../../toast';
import { changePassword, getProfileImage, getProfileName, setProfile, setProfileName } from '../../../utils/api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import spinner from '../../../assets/spinner.gif'
function Profile() {
    let navigate = useNavigate()

    const [viewPassword,setViewPassword] = useState({
      password : false,
      confirm : false,
      old : false,
    })

    //image upload states
    const [image, setImage] = useState(null);

    const [loading,setLoading] = useState({
        image : false,
        name : false,
        password : false,
    })
    let win = useSelector((state) => state.statusReducer.id);
    let id = win || window.localStorage.getItem("id")

useEffect(()=>{
    getName()
    getImage()
    },[])
    
    const getImage = async()=>{
        try {
            setLoading({...loading, image: true});
            let {data} = await axios.get(`${getProfileImage}/${id}`);
            setLoading({...loading,image : false});
            setImage(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getName = async()=>{
        try {
            let {data} = await axios.get(`${getProfileName}/${id}`);
              formik1.setValues({
                    ...formik1.values, name : data.name , mobile : data.mobile
                  })
        } catch (error) {
            console.log(error);
        }
    }

//image validation part
const validateImg = async(e)=>{
const file = e.target.files[0];
if(file.size >= 1048576){
  return alert("Max file size is 1mb");
}else{
    try {
        const d = new FormData();
        d.append('image',file);
        d.append('id',id)
        setLoading({...loading,image : true});
        e.target.value = '';
        try {
          const {status,data} = await axios.post(setProfile,d,{
            headers: {
              authorization: window.localStorage.getItem("token")
            }})
          if (status === 201) {
            setLoading({...loading,image : false});
              await getImage()
              toast.fire({
                  icon: "success",
                  title: data.message,
                });
              } else {
                setLoading({...loading,image : false});
                toast.fire({
                  icon: "warning",
                  title: data.message,
                });
              }
        } catch (error) {
          setLoading({...loading,image : false});
          toast.fire({
            icon: "error",
            title: error.response.data.message
          });
        }
    }catch(error){
    }
}

}


const formik1 = useFormik({
    initialValues: {
      name: "",
      mobile: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      mobile: yup.string().required().min(10,'Phone number is not valid').max(10,'Phone number is not valid')
    }),

    onSubmit: async (values) => {
      try {
        values.id = id;
        setLoading({...loading,name : true});
        let {data,status} = await axios.post(setProfileName, values,{
          headers: {
            authorization: window.localStorage.getItem("token")
          }});
        

        if (status === 201) {
          setLoading({...loading,name : false});
             await getName()
             toast.fire({
                icon: "success",
                title: data.message,
              });
        } else {
          setLoading({...loading,name : false});
          toast.fire({
            icon: "warning",
            title: data.message,
          });
        }
      } catch (error) {
        setLoading({...loading,name : false});
        toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
  });

const formik = useFormik({
    initialValues: {
      oldPassword : "",
      newPassword: "",
      conformPassword: "",
    },
    validationSchema: yup.object({
      oldPassword : yup.string().required("Old password is required"),
      newPassword: yup
          .string()
          .required("New password is required")
          .min(5, "Your password must be longer than 5 characters.")
          .max(25)
          .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Must Contain One Uppercase, One Lowercase"
          )
          // .matches(
          //   /^(?=.*[!@#\$%\^&\*])/,
          //   "Must Contain One Special Case Character"
          // )
          .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
        conformPassword: yup
          .string()
          .required("Conform password is required")
          .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
      }),

    onSubmit: async (values) => {
      try {
        console.log(values);
        delete values.conformPassword;
        values.id = id;
        setLoading({...loading,password : true});
        let {status,data} = await axios.post(changePassword,values,{
          headers: {
            authorization: window.localStorage.getItem("token")
          }});
        if (status === 201) {
          setLoading({...loading,password : false});
          toast.fire({ icon: 'success', title: data.message})
        }else{
          setLoading({...loading,password : false});
          toast.fire({ icon: 'warning', title: data.message })
        }
       
      } catch (error) {
        setLoading({...loading,password : false});
        toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
  });

  return (
   <>
<div className='kkk'>

<div className="signup-profile-pic__container">
 
 {
    loading.image ? <img src={spinner} alt="bot" className="signup-profile-pic" /> : <img src={image} alt="bot" className="signup-profile-pic" /> 
 }
<label htmlFor="image-upload" className="image-upload-label">
  <i className="fas fa-plus-circle add-picture-icon"></i>
</label>
<input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={(e)=>validateImg(e)} />
 </div>

 <div className='forms'>
 <Form
        onSubmit={(values) => {
          formik1.handleSubmit(values);
        }}
      >
 <Form.Group md="4" className='mt-3'  controlId="validationFormik01">
            <Form.Label style={{color : "white"}}>Name</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"text"}
              value={formik1.values.name}
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              name="name"
              isValid={formik1.touched.name && !formik1.errors.name}
              isInvalid={!!formik1.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik1.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group md="4" className='mt-2' controlId="validationFormik01">
            <Form.Label style={{color : "white"}}>Mobile</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"tel"}
              value={formik1.values.mobile}
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              name="mobile"
              isValid={formik1.touched.mobile && !formik1.errors.mobile}
              isInvalid={!!formik1.errors.mobile}
            />
            <Form.Control.Feedback type="invalid">
              {formik1.errors.mobile}
            </Form.Control.Feedback>
          </Form.Group>
          <button type="submit" className="submit-btn mt-3" >
          {loading.name ? (
            <Spinner Spinner width={"1.4rem"}/>
          ) : (
            "Update"
          )}
        </button>
        </Form>
 </div>

 <div>

      <Form
        onSubmit={(values) => {
          formik.handleSubmit(values);
        }}
      >
        <h3 style={{color : "orange"}} className="mt-1">Change password</h3>

        <Form.Group md="4" controlId="validationFormik01">
            <Form.Label style={{color : "white"}}>Old Password</Form.Label>
<div  className="password-wrap">
<Form.Control
              className=" shadow-none"
              type={viewPassword.old ? "text" : "password" }
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="oldPassword"
              // isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
              isInvalid={!!formik.errors.oldPassword}
            />
            <span className="eye" onClick={()=>setViewPassword({...viewPassword,old : !viewPassword.old})}>
              {
                viewPassword.old ? <i class="fa-solid fa-eye-slash"></i> : <i class="fas fa-eye"></i>
              }
              
              
              </span>
              <Form.Control.Feedback type="invalid">
              {formik.errors.oldPassword}
            </Form.Control.Feedback>
</div>

          </Form.Group>
          <Form.Group md="4" className='mt-1' controlId="validationFormik01">
            <Form.Label style={{color : "white"}}>New Password</Form.Label>
<div className="password-wrap">
<Form.Control
              className=" shadow-none"
              type={viewPassword.password ? "text" : "password" }
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="newPassword"
              // isValid={formik.touched.newPassword && !formik.errors.newPassword}
              isInvalid={!!formik.errors.newPassword}
            />

<span className="eye" onClick={()=>setViewPassword({...viewPassword,password : !viewPassword.password})}>
              {
                viewPassword.password ? <i class="fa-solid fa-eye-slash"></i> : <i class="fas fa-eye"></i>
              }
              
              
              </span>
              <Form.Control.Feedback type="invalid">
              {formik.errors.newPassword}
            </Form.Control.Feedback>
</div>

          </Form.Group>


          <Form.Group md="4" className='mt-1 mb-3' controlId="validationFormik01">
            <Form.Label style={{color : "white"}}>Conform Password</Form.Label>
<div className="password-wrap">
<Form.Control
              className=" shadow-none"
              type={viewPassword.confirm ? "text" : "password" }
              value={formik.values.conformPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="conformPassword"
              // isValid={
              //   formik.touched.conformPassword && !formik.errors.conformPassword
              // }
              isInvalid={!!formik.errors.conformPassword}
            />
                                    <span className="eye" onClick={()=>setViewPassword({...viewPassword,confirm : !viewPassword.confirm})}>
              {
                viewPassword.confirm ? <i class="fa-solid fa-eye-slash"></i> : <i class="fas fa-eye"></i>
              }
              
              
      
       </span>
       <Form.Control.Feedback type="invalid">
              {formik.errors.conformPassword}
            </Form.Control.Feedback> 
     
</div>
     
          </Form.Group>

        <button type="submit" className="reset-form-submit-btn" >
          {loading.password ? (
            <Spinner width={"1.4rem"}/>
          ) : (
            " Change Password "
          )}
        </button>
        
      </Form>
 </div>

 <div>
 <div className="mt-3 back-to-login">
          <Button variant='success' onClick={() => navigate("/product")}>Back to Product</Button>
        </div>
 </div>

</div>
   </>
  )
}

export default Profile