import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { env } from "../../config";
import * as yup from "yup";
import Swal from 'sweetalert2';
import { Container, Form, Row } from "react-bootstrap";
import { passwordResetPage } from "../../utils/api";
import Toast from "../toast";
import Spinner from "../Spinner";

function ForgotPasswordPage() {
  const params = useParams();
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();


    //Alert function;


  const formik = useFormik({
    initialValues: {
      password: "",
      conformPassword: "",
    },
    validationSchema: yup.object({
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
          // .matches(
          //   /^(?=.*[!@#\$%\^&\*])/,
          //   "Must Contain One Special Case Character"
          // )
          .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
        conformPassword: yup
          .string()
          .required()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      }),

    onSubmit: async (values) => {
      try {
        console.log(values);
        delete values.conformPassword;
        values.id = params.user;
        setloading(true);
        let {data,status} = await axios.post(`${passwordResetPage}`,values, {
          headers: {
            authorization: params.token
          }});

        if (status === 201) {
          setloading(false);
          Toast.fire({ icon: 'success', title:data.message })
            navigate("/login");
        }else{
          setloading(false);
          Toast.fire({ icon: 'error', title: data.message })
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
        <img src="image/avatar.png" alt="" className="img"  />
        <h2>Password Reset Form</h2>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={!!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Conform Password</Form.Label>
            <Form.Control
              className=" shadow-none"
              type={"password"}
              value={formik.values.conformPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="conformPassword"
              isValid={
                formik.touched.conformPassword && !formik.errors.conformPassword
              }
              isInvalid={!!formik.errors.conformPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.conformPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <button type="submit" className="reset-form-submit-btn" disabled={!formik.isValid}>
          {loading ? <Spinner width={"1.5rem"}/> : (
            " Change Password "
          )}
        </button>
        <div className="mt-3 back-to-login">
          <span onClick={() => navigate("/login")}>Back to login</span>
        </div>
      </Form>
    </div>
  );
}

export default ForgotPasswordPage;
