import React, { useState } from "react";
import "./login.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  Form, Row } from "react-bootstrap";
import * as yup from "yup";
import Toast from "../toast";
import { forgotPassword } from "../../utils/api";
// import { env } from "../../config";

function ForgotPassword() {
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let [resend, setResend] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
    }),
    onSubmit: async (values) => {
      try {
        setloading(true);
        let {data,status} = await axios.post(forgotPassword, values);
        if (status === 200) {
          setResend(true);
          setloading(false);
          Toast.fire({
            icon: "success",
            title: data.message,
          });  
        } else {
          
          Toast.fire({
            icon: "warning",
            title: data.message,
          });
          setloading(false);
        }
      } catch (error) {
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
        <img src="image/avatar.png" className="img" alt="" />
        <h2>Forgot Password</h2>
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
        <button type="submit" className="submit-btn" disabled={!formik.isValid}>
          {loading ? (
            <img src="./image/loading.svg" alt="load" className="spinner" />
          ) : resend ? (
            "Resend mail"
          ) : (
            "Send mail"
          )}
        </button>
        <div className="mt-3 back-to-login">
          <span onClick={() => navigate("/login")}>Back to login</span>
        </div>
      </Form>
    </div>
  );
}

export default ForgotPassword;
