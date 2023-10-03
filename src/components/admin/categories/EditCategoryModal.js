import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { getCategory } from '../../../redux/slice/admin/categoryReducer';
import { editCategoryApi } from "../../../utils/api";
import Spinner from "../../Spinner";
import Toast from "../../toast";

function EditCategorieModal({ show, handleClose,data}) {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.category) {
        errors.category = "Enter your category";
      }
      return errors;
    },
    onSubmit: async (values) => {
   try {
    values.id=data._id
    setLoading(true)
    const value = await axios.put(editCategoryApi,values, {
      headers: {
        authorization: window.localStorage.getItem("token")
      }});
    setLoading(false)
    if(value.status === 200){
      dispatch(getCategory());
      Toast.fire({
                icon: 'success',
                title: value.data.message
              })
      formik.resetForm();
      handleClose();
    }else{
      Toast.fire({
                icon: 'warning',
                title: value.data.message
              })

    }
   } catch (error) {
     setLoading(false)
    Toast.fire({
      icon: 'error',
      title: error.response.data.message
    })
   }
    }
  });

  useEffect(()=>{
    formik.setValues({
      category : data.category
    })
  },[data])

  return (
    <>
      <Modal
        show={show}
        onHide={ loading ? null : () => { handleClose(); formik.resetForm()}}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={()=>{formik.resetForm();setLoading(false);handleClose()}}>
          <Modal.Title>Edit Categories</Modal.Title>
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
                onClick={()=>{formik.resetForm();setLoading(false);handleClose()}}
              >
                <i class="fa-solid fa-reply"></i> Close
              </Button>
              <Button variant="success" type="submit">
              {loading ? (
           <Spinner width = {"1.5rem"}/>
          ) : (
            <><i class="fa-solid fa-floppy-disk"></i> Save</>
          )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default EditCategorieModal;
