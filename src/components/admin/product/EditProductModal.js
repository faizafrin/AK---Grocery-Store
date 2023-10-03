import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getAdminProduct } from '../../../redux/slice/admin/AdminProductReducer';
import { editEditApi } from '../../../utils/api';
import Loading from '../../Loading';
import Spinner from '../../Spinner';
import Toast from '../../toast';
import PreviewImage from './PreviewImage';

function EditProductModal({ show, handleClose, data }) {
    const categorys = useSelector((state) => state.categoryReducer.category);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const support_formats = ["image/png", "image/webp","image/jpeg", "image/jpg"];
    const [loading,setLoading] = useState(false)
    const [imgLoading,setImgLoading] = useState(false)
   const [changingQuantity,setChangingQuantity] = useState(0);  
    const formik = useFormik({
        initialValues: {
            category: "",
            product: "",
            amount: "",
            quantity: "",
            file: "",
            unit:"",
            id:"",
            public_id : "",
            changingQuantity : "",
            sold : "",
            availablStock : "", 
            
        },
        validationSchema : yup.object().shape(
            {
              category: yup.string().required("Select a category"),
              product: yup.string().required("Enter your Product"),
            //   .test('len', 'Must be exactly 20 characters', value => value.length <= 20),
              amount:yup.number().required("Enter your amount"),
              quantity:yup.number().required("Enter your quantity"),
              unit : yup.string().required("Select a product unit"),
             file : yup.mixed()
             .nullable()
             .required()
             .test(
              "FILE_SIZE",
              "Image less than 1MB",
              (value)=> !value || (value && value.size <= 1024 * 1024 * 1)
             ).test(
              'FILE_FORMAT',
              'Png & webp file format only support',
              (value)=> !value || (value && support_formats.includes(value?.type))
             ),
            }
          ),
        onSubmit: async (values) => {
            // console.log(values.changingQuantity);
        try {
            const {category,product,amount,quantity,file ,unit ,id,public_id} = values;
            const formData = new FormData()
            formData.append('category',category)
            formData.append('product',product)
            formData.append('amount',amount)
            formData.append('quantity',quantity)
            formData.append('unit',unit)
            formData.append('image',file)
            formData.append('id',id)
            formData.append('public_id',public_id)
            formData.append('changingQuantity',changingQuantity)
            setLoading(true)
           const data = await axios.put(editEditApi,formData, {
            headers: {
              authorization: window.localStorage.getItem("token")
            }})
           setLoading(false)
           if(data.status === 200){
            dispatch( getAdminProduct())
            Toast.fire({
                icon: 'success',
                title: data.data.message
              })
              formik.resetForm();
              handleClose();
              setChangingQuantity(0)
           }else{
            Toast.fire({
                icon: 'warning',
                title: data.data.message
              })
           }
        } catch (error) {
            setLoading(false)
            Toast.fire({
              icon: 'error',
              title: error.response.data.message
            })
        }
        },
    });

    useEffect(()=>{
        const {category,image,product,unit,quantity,amount,_id,public_id,sold,availableInStock}= data



// const { category, image, product, unit, quantity, amount, _id,public_id ,availableInStock,sold} = data;
    const getUrlExtension = (url) => {
      return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
    }
  const onImageEdit = async (imgUrl) => {
      var imgExt = getUrlExtension(imgUrl || "https://rukminim1.flixcart.com/image/416/416/kv6zvrk0/washing-powder/4/5/o/plus-jasmine-and-rose-tide-original-imag85cbd6expw6u.jpeg");
      setImgLoading(true)
      const response = await fetch(imgUrl);
      // let filename = `${imgUrl.name}`;
      // console.log(filename);
      const blob = await response.blob();
      const file = new File([blob], "" + imgExt, {
        type: blob.type,
      }
      
      );
      formik.setValues(
    {
        category: category,
        product: product,
        amount: amount,
        quantity: quantity,
        file: file,
        unit: unit,
        id:_id,
        public_id,
        sold : sold,
        availablStock : availableInStock, 
    },
)
setImgLoading(false);
    }

 onImageEdit(image);
    },[data])



    const quantityIncrease = ()=>{    
             let val = changingQuantity + 1
             setChangingQuantity(val)
    }
    const quantityDecrease = ()=>{
        const { availableInStock , quantity } = data
        let val = changingQuantity -1
        if(availableInStock >= Math.abs(val) && availableInStock > 0){
            setChangingQuantity(val)
        }else{
            Toast.fire({
                icon: 'warning',
                // title: `Only ${availableInStock} quantity is avaliable`
                title : `Remaining ${quantity - Math.abs(changingQuantity)} quantity are sold `
              })
           }
    }

    const directChangeQuantity = (value)=>{
        const { availableInStock , quantity } = data
        setChangingQuantity(null)
        if(value >= 0){
            setChangingQuantity(value)
        }else{
            if(availableInStock >= Math.abs(value) && availableInStock > 0){
                setChangingQuantity(value)
            }else{
                setChangingQuantity(0)
                Toast.fire({
                    icon: 'warning',
                    title : `Remaining ${quantity - availableInStock} quantity are sold `
                  })
               }
        }
    }
    return (
        <>
            <Modal show={show} onHide={ loading ? null : () => { handleClose(); formik.resetForm();setChangingQuantity(0)}}size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onClick={() =>{handleClose(); formik.resetForm(); setLoading(false);setChangingQuantity(0)}}>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
{
    imgLoading ? <div className='d-flex justify-content-center align-items-center'> <Loading width={"5rem"}/> </div> : <Form noValidate onSubmit={formik.handleSubmit}>
    <Row>
        <Col md={6} controlId="validationFormik01">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                isValid={formik.touched.category && !formik.errors.category}
                isInvalid={!!formik.errors.category}
                className="shadow-none"
            >
                <option>Select Category</option>
                {
categorys.length > 0 && categorys.map((item,index)=>{
return <option value={item.category} key={index}>{item.category}</option>
})
}
            </Form.Select>
            
            <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
        </Col>
        <Col md={6} controlId="validationFormik02">
            <Form.Label>Product</Form.Label>
            <Form.Control
                className=' shadow-none'
                type="text"
                name="product"
                value={formik.values.product}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur("product")} 
                isValid={formik.touched.product && !formik.errors.product}
                isInvalid={!!formik.errors.product}
            />

           
            <Form.Control.Feedback type="invalid">{formik.errors.product}</Form.Control.Feedback>
        </Col>
    </Row>
    <Row>
        <Col md={6} controlId="validationFormik03">
            <Form.Label>Amount</Form.Label>
            <Form.Control
                className=' shadow-none'
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur} 
                isValid={formik.touched.amount && !formik.errors.amount}
                isInvalid={!!formik.errors.amount}
                
            />
         
            <Form.Control.Feedback type="invalid">{formik.errors.amount}</Form.Control.Feedback>
        </Col>
        <Col md={6} controlId="validationFormik04" className='edit-quantity-main'>
           <div>
           <Form.Label>Quantity</Form.Label>
            <Form.Control
                className=' shadow-none'
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur} 
                isValid={formik.touched.quantity && !formik.errors.quantity}
                isInvalid={!!formik.errors.quantity}
                readOnly
            />
           </div>
             <div className='edit-quantity'>
       <i class="fas fa-plus " onClick={quantityIncrease}></i><input type="number"  value={changingQuantity} onChange={(e)=>directChangeQuantity(e.target.value)}/><i class="fas  fa-minus"onClick={quantityDecrease} ></i>
       </div>
            <Form.Control.Feedback type="invalid">{formik.errors.quantity}</Form.Control.Feedback>
        </Col>
        {/* <Col md={3} sm={6}>
      
        </Col> */}
    </Row>
    <Row className="mb-3">
    <Col md={3} controlId="validationFormik03">
            <Form.Label>Available stock</Form.Label>
            <Form.Control
                className=' shadow-none'
                type="number"
                name="availableStock"
                value={formik.values.availablStock}
                readOnly
            />
         
           
        </Col>
        <Col md={3} controlId="validationFormik03">
            <Form.Label>Sold</Form.Label>
            <Form.Control
                className=' shadow-none'
                type="number"
                name="sold"
                value={formik.values.sold}  
                readOnly                                
            />
         
            
        </Col>
    <Col md={6} controlId="validationFormik02">
<Form.Label>Unit</Form.Label>
<Form.Select aria-label="Default select example"
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

<Form.Control.Feedback type="invalid">{formik.errors.unit}</Form.Control.Feedback>
</Col>



    </Row>
    <Row>

    <Col md={12}  controlId="validationFormik05">
<Form.Control type="file" className=' shadow-none'   
ref = {fileRef}            
name="file"
accept="image/*"
hidden
onChange={(event) => {
formik.setFieldValue("file", event.currentTarget.files[0]);
}}
// onBlur={formik.handleBlur} 
isValid={formik.touched.file && !formik.errors.file}
isInvalid={!!formik.errors.file} />

<div className='d-flex justify-content-end align-items-center mt-0'>
<Button
variant='secondary'
onClick={()=>{
fileRef.current.click();
}}
>Upload image</Button>
{
formik.values.file && <PreviewImage file = {formik.values.file} name={formik.values.file.name}/>
}
</div>
<Form.Control.Feedback type="invalid">{formik.errors.file}</Form.Control.Feedback>
</Col>

    </Row>
    <div className='d-flex justify-content-end align-items-center gap-2'>
        <Button variant="secondary" onClick={() => { formik.resetForm(); handleClose();setLoading(false);setChangingQuantity(0) }}>
        <i class="fa-solid fa-reply"></i> Close
        </Button>
        <Button variant="success" type='submit'>
        {loading ? (
<Spinner width = {"1.5rem"}/>
) : (
<><i class="fa-solid fa-floppy-disk"></i> Save</>
)}
        </Button>
    </div>
</Form>
}
                    
                </Modal.Body>

            </Modal>
        </>
    )
}

export default EditProductModal