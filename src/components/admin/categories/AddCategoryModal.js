import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { getCategory } from "../../../redux/slice/admin/categoryReducer";
import { addCategoryApi } from "../../../utils/api";
import Spinner from "../../Spinner";
import Toast from "../../toast";

function AddCategorieModal({ show, handleClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.category.length === 0) {
        errors.category = "Enter your category";
      }
      return errors;
    },
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const value = await axios.post(addCategoryApi, data, {
          headers: {
            authorization: window.localStorage.getItem("token")
          }});
        setLoading(false);

        if (value.status === 201) {
          dispatch(getCategory());
          formik.resetForm();
          Toast.fire({
            icon: "success",
            title: value.data.message,
          });
          handleClose();
        } else {
          Toast.fire({
            icon: "warning",
            title: value.data.message,
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
        size="md"
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
          <Modal.Title>Add Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationFormik01">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  className=" shadow-none"
                  type="text"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.category && !formik.errors.category}
                  isInvalid={!!formik.errors.category}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  formik.resetForm();
                  setLoading(false);
                  handleClose();
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
export default AddCategorieModal;
