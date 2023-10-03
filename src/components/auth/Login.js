import React, { useState } from "react";
import "./login.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Row } from "react-bootstrap";
import { login } from "../../utils/api";
import { useDispatch } from "react-redux";
import { status } from "../../redux/slice/statusReducer";
import Toast from "../toast";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.email.length === 0) {
        errors.email = "Enter your email address";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }
      if (values.password.length === 0) {
        errors.password = "Enter your password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true);
        let { data } = await axios.post(login, values);
        const { message, statusCode, token, id, isAdmin, name, mobile, email } = data;
        setloading(false);
        if (statusCode === 201) {
          window.localStorage.setItem("isAdmin", isAdmin);
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("id", id);
          window.localStorage.setItem("name", name);
          window.localStorage.setItem("mobile", mobile);
          window.localStorage.setItem("email", email);
          dispatch(status({
            isAdmin,
            token,
            id,
            name,
            mobile,
            email
          }))
          Swal.fire(
            "Login Successfull",
            "Your session expiry in 10 minutes!",
            "success"
          );
          if (isAdmin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }


        } else {
          Toast.fire({
            icon: "warning",
            title: message,
          });
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
        <img src="image/avatar.png" alt="" className="img" />
        <h2>Login</h2>
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
        <Row>
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Password</Form.Label>
            <div className="password-wrap">
              <Form.Control
                className=" shadow-none"
                type={viewPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                // isValid={formik.touched.password && !formik.errors.password}
                isInvalid={!!formik.errors.password}
              />
              <span className="eye" onClick={() => setViewPassword(!viewPassword)}>
                {
                  viewPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fas fa-eye"></i>
                }


              </span>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </div>

          </Form.Group>
        </Row>
        <div className=" forgot ">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password ?
          </span>
        </div>
        <button type="submit" className="submit-btn" disabled={!formik.isValid}>
          {loading ? (
            <img src="./image/loading.svg" alt="load" className="spinner" />
          ) : (
            " Login "
          )}
        </button>        <div className="mt-3 new-user">
          Dont 't have an account?
          <span onClick={() => navigate("/register")}> Sign up</span>
        </div>
      </Form>

      {/* <div className="sss" >
        <h6>Admin : - </h6>
        <p>Email : -</p>
        <p>Password :-</p>
        <h6>User : -</h6>
        <p>Kindly to create an account</p>
      </div> */}
    </div>
  );
}

export default Login;
