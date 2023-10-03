import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { env } from "../../config";
import * as yup from "yup";
import { register, sendOtp } from "../../utils/api";
import Toast from "../toast";
import Otp from "./otp/Otp";

function Register() {
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const addHandleClose = () => setAddShow(false);
  const addHandleShow = () => setAddShow(true);

  const [viewPassword,setViewPassword] = useState({
    password : false,
    confirm : false,
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      conformPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .required()
        .min(5, "Your password must be longer than 5 characters.")
        .max(25)
        .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])/,
          "Must Contain One Uppercase, One Lowercase"
        )
        .matches(
          /^(?=.*[!@#\$%\^&\*])/,
          "Must Contain One Special Case Character"
        )
        .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
      conformPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: async (values) => {
      try {
        delete values.conformPassword;
        setloading(true);
        let {status,data} = await axios.post(sendOtp, {email : values.email});
        setloading(false);
      if(status ===  200){
        addHandleShow()
      }
      } catch (error) {
        setloading(false);
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
  });

  return (
    <div className="login-wrapper">
      <Form
        className="form"
        onSubmit={(values) => {
          formik.handleSubmit(values);
        }}
      >
        <img src="image/feavat.jpg" alt="" className="img" />
        <h2>Sign Up</h2>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"text"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              isValid={formik.touched.name && !formik.errors.name}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"text"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              isValid={formik.touched.email && !formik.errors.email}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Password</Form.Label>
<div className="password-wrap">
<Form.Control
              className=" shadow-none"
              type={viewPassword.password ? "text" : "password" }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              // isValid={formik.touched.password && !formik.errors.password}
              isInvalid={!!formik.errors.password}
            />
                        <span className="eye" onClick={()=>setViewPassword({...viewPassword,password : !viewPassword.password})}>
              {
                viewPassword.password ? <i class="fa-solid fa-eye-slash"></i> : <i class="fas fa-eye"></i>
              }
              
              
              </span>
              <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
</div>

          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Conform Password</Form.Label>
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
        </Row>
        <button type="submit" className="submit-btn" disabled={!formik.isValid || loading}>
          {loading ? (
            <img src="./image/loading.svg" alt="load" className="spinner" />
          ) : (
            " Register "
          )}
        </button>{" "}
        <div className="mt-3 new-user">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </div>
      </Form>
      <Otp
        handleClose={addHandleClose}
        handleShow={addHandleShow}
        show={addShow}
        data = {{email : formik.values.email}}
        values = {{values : formik.values}}
      />
    </div>
  );
}

export default Register;
