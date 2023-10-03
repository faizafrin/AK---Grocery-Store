import React from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Toast from '../../toast';
import { editAddressApi } from '../../../utils/api';
import { getAddress } from '../../../redux/slice/statusReducer';
import { city, state } from './cscApi';
function EditAddress({ show, handleClose,data }) {
  const [states,setStates] = useState();
  const [citys, setCitys ] = useState();
  let id = useSelector((state) => state.statusReducer.id);
  const [loading,setLoading] = useState(); 
  const dispatch = useDispatch(); 
    const formik = useFormik({
        initialValues: {
            country:"",
            firstName : "",
            lastName : "",
            address : "",
            state : "",
            city : "",
            pinCode : "",
            mobile : "",
            id : "",
        },
    
        validationSchema: yup.object().shape({
          country: yup.string().required("Select a Country"),
          firstName: yup.string().required("Enter a first name"),
          lastName: yup.string().required("Enter a last name"),
          address: yup.string().required("Enter a address"),
          state: yup.string().required("Select a sate"),
          city: yup.string().required("Select a city"),
          pinCode: yup.string().required("Enter a pincode"),
          mobile: yup.string().required("Enter a mobile number"),
         
        }),
    
        onSubmit: async (values) => {
          try {
            
            let win = window.localStorage.getItem("id")
            values.user_id = win || id
              setLoading(true);
            let data = await axios.put(editAddressApi, values, {
              headers: {
                authorization: window.localStorage.getItem("token")
              }});
            setLoading(false);
            if (data.status === 200) {
                  dispatch(getAddress())
              Toast.fire({
                icon: "success",
                title: data.data.message,
              });
              formik.resetForm();
              handleClose();
            } else {
              Toast.fire({
                icon: "warning",
                title: data.data.message,
              });
            }
          } catch (error) {
            setLoading(false);
            Toast.fire({
              icon: "error",
              title: error.response.data.message,
            });
          }
        },
      });
    
useEffect(()=>{
const {firstName, lastName, address, city,state, country, pinCode, mobile, id} = data
  formik.setValues({firstName, 
    lastName, 
    address, 
    city, 
    country,
    state, 
    pinCode, 
    mobile, 
    id,
  })

  getCity(state)
   
  getState()
},[data])

// get state name
const getState = async ()=>{
let s = await state();
setStates(s)
}

// get city name
const getCity = async(state)=>{
let singleState = states.find((item)=>item.name === state)
let s1 =  await city(singleState.iso2)
setCitys(s1)
}
  return (
    <Modal
    show={show}
    onHide={() => {
        formik.resetForm();
        handleClose();
      }}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header
      closeButton
      onClick={() => {
        formik.resetForm();
        handleClose();
      }}
    >
      <Modal.Title>Edit address</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row >
        <Col md={12} controlId="validationFormik01" className='mb-3'>
              
              <Form.Select
                aria-label="Default select example"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.country}
                className="shadow-none"
              >
                <option>Select Country</option>
                <option value="India">India</option>
                {/* {country.length > 0 &&
                  country.map((item, index) => {
                    return (
                      <option value={item.country} key={index}>
                        {item.country}
                      </option>
                    );
                  })} */}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.country}
              </Form.Control.Feedback>
            </Col>
        </Row>

<Row >
<Col md={6} controlId="validationFormik02" className='mb-3'>
            <Form.Control
              className=" shadow-none"
              type="text"
              placeholder='First name'
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur("firstName")}
              isInvalid={!!formik.errors.firstName}
            />


            <Form.Control.Feedback type="invalid">
            {formik.errors.firstName}
            </Form.Control.Feedback>
          </Col>
          <Col md={6} controlId="validationFormik02" className='mb-3'>
            <Form.Control
              className=" shadow-none"
              type="text"
              placeholder='Last name'
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur("lastName")}
              isInvalid={!!formik.errors.lastName}
             />


            <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
            </Form.Control.Feedback>
          </Col>
</Row>
<Row >
<Col md={12} controlId="validationFormik02" className='mb-3'>
<Form.Control as="textarea" rows={3} 
 placeholder="Address (Area & street)" 
 className='shadow-none'
  name='address'
  value={formik.values.address}
  onChange={formik.handleChange}
  // onBlur={formik.handleBlur("address")}
  isInvalid={!!formik.errors.address}
  />


            <Form.Control.Feedback type="invalid">
            {formik.errors.address}
            </Form.Control.Feedback>
          </Col>

</Row>
<Row >
<Col md={4} controlId="validationFormik01"className='mb-3'>
              
                <Form.Select
                  aria-label="Default select example"
                  name="state"
                  value={formik.values.state}
                  onChange={(e)=>{formik.handleChange(e);getCity(e.target.value)}}
                  isInvalid={!!formik.errors.state}
                  className="shadow-none"
                >
                  <option>Select State</option>
                  {states !== undefined &&
                    states.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.state}
                </Form.Control.Feedback>
              </Col>
              <Col md={4} controlId="validationFormik01" className='mb-3'>
              
                <Form.Select
                  aria-label="Default select example"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.city}
                  className="shadow-none"
                >
                  <option>Select City</option>
                  {citys !== undefined &&
                    citys.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.city}
                </Form.Control.Feedback>
              </Col>
          <Col md={4} controlId="validationFormik02" className='mb-3'>
            <Form.Control
              className=" shadow-none"
              type="number"
              placeholder='Pincode'
              name="pinCode"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur("pinCode")}
              isInvalid={!!formik.errors.pinCode}
            />


            <Form.Control.Feedback type="invalid">
            {formik.errors.pinCode}
            </Form.Control.Feedback>
          </Col>
</Row>
<Row >
<Col md={5} controlId="validationFormik02" className='mb-3'>
            <Form.Control
              className=" shadow-none"
              type="tel"
              placeholder='Mobile number'
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur("product")}
              isInvalid={!!formik.errors.mobile}
            />


            <Form.Control.Feedback type="invalid">
            {formik.errors.mobile}
            </Form.Control.Feedback>
          </Col>
</Row>
        <div className="d-flex justify-content-end align-items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
            {/* {loading ? <Spinner width={"1.5rem"} /> : " Add "} */}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
  )
}

export default EditAddress