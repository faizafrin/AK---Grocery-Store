import axios from "axios";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProductApi } from "../../../utils/api";
import Spinner from "../../Spinner";
import * as yup from "yup";
import PreviewImage from "./PreviewImage";
import { getAdminProduct } from "../../../redux/slice/admin/AdminProductReducer";
import Toast from "../../toast";

function AddProductModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const support_formats = ["image/png", "image/webp","image/jpeg", "image/jpg", "image/avif"];
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // To get the data in reducer
  const categorys = useSelector((state) => state.categoryReducer.category);

  const formik = useFormik({
    initialValues: {
      category: "",
      product: "",
      amount: "",
      quantity: "",
      unit: "",
      file: null,
    },

    validationSchema: yup.object().shape({
      category: yup.string().required("Select a category"),
      product: yup.string().required("Enter your Product"),
  // .test('len', 'Must be exactly 20 characters', value => value.length <= 20),
      amount: yup.number().required("Enter your amount"),
      quantity: yup.number().required("Enter your quantity").min(10,"Add minimum 10 Quantity"),
      unit: yup.string().required("Select a product unit"),
      file: yup
        .mixed()
        .nullable()
        .required()
        .test(
          "FILE_SIZE",
          "upload image less than 1MB",
          (value) => !value || (value && value.size <= 1024 * 1024 * 1)
        )
        .test(
          "FILE_FORMAT",
          "Png & webp file format is support",
          (value) => !value || (value && support_formats.includes(value?.type))
        ),
    }),

    onSubmit: async (values) => {
      try {
        const { category, product, amount, quantity, file, unit } = values;
        const formData = new FormData();
        formData.append("category", category);
        formData.append("product", product);
        formData.append("amount", amount);
        formData.append("quantity", quantity);
        formData.append("unit", unit);
        formData.append("image", file);

        setLoading(true);
        let data = await axios.post(addProductApi, formData, {
          headers: {
            authorization: window.localStorage.getItem("token")
          }});
        setLoading(false);
        if (data.status === 201) {
          console.log(data);
          dispatch(getAdminProduct());
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

  // {
  //   headers : {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }

  return (
    <>
      <Modal
        show={show}
        onHide={
          loading
            ? null
            : () => {
                handleClose();
                formik.resetForm();
                setLoading(false);
              }
        }
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
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6} controlId="validationFormik01">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  isValid={formik.touched.category && !formik.errors.category}
                  isInvalid={!!formik.errors.category}
                  className="shadow-none"
                >
                  <option>Select Category</option>
                  {categorys.length > 0 &&
                    categorys.map((item, index) => {
                      return (
                        <option value={item.category} key={index}>
                          {item.category}
                        </option>
                      );
                    })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Col>
              <Col md={6} controlId="validationFormik02">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  className=" shadow-none"
                  type="text"
                  name="product"
                  value={formik.values.product}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur("product")}
                  isValid={formik.touched.product && !formik.errors.product}
                  isInvalid={!!formik.errors.product}
                />


                <Form.Control.Feedback type="invalid">
                  {formik.errors.product}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6} controlId="validationFormik03">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  className=" shadow-none"
                  type="number"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  isValid={formik.touched.amount && !formik.errors.amount}
                  isInvalid={!!formik.errors.amount}
                />

                <Form.Control.Feedback type="invalid">
                  {formik.errors.amount}
                </Form.Control.Feedback>
              </Col>
              <Col md={6} controlId="validationFormik04">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  className=" shadow-none"
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  isValid={formik.touched.quantity && !formik.errors.quantity}
                  isInvalid={!!formik.errors.quantity}
                />

                <Form.Control.Feedback type="invalid">
                  {formik.errors.quantity}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} lg={6} controlId="validationFormik02">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur("product")}
                  isValid={formik.touched.unit && !formik.errors.unit}
                  isInvalid={!!formik.errors.unit}
                  className="shadow-none"
                >
                  <option>Select Unit</option>
                  <option value={"gm"}>gm</option>
                  <option value={"kg"}>kg</option>
                  <option value={"L"}>L</option>
                  <option value={"ml"}>ml</option>
                  <option value={"pcs"}>pcs</option>
                  
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.unit}
                </Form.Control.Feedback>
              </Col>
              <Col md={12} lg={6} controlId="validationFormik05">
                <Form.Control
                  type="file"
                  className=" shadow-none"
                  ref={fileRef}
                  name="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  // onBlur={formik.handleBlur}
                  isValid={formik.touched.file && !formik.errors.file}
                  isInvalid={!!formik.errors.file}
                />

                <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    Upload image
                  </Button>
                  {formik.values.file && (
                    <PreviewImage
                      file={formik.values.file}
                      name={formik.values.file.name}
                    />
                  )}
                </div>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.file}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  formik.resetForm();
                  setLoading(false);
                }}
              >
                <i class="fa-solid fa-reply"></i> Close
              </Button>
              <Button variant="success" type="submit">
                {loading ? <Spinner width={"1.5rem"} /> : <><i class="fa-solid fa-floppy-disk"></i> Add</>}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProductModal;
