import React, { useEffect, useState } from "react";
import "./product.css";
import AddProductModal from "./AddProductModal";
import { Button, Container, Table } from "react-bootstrap";
import Search from "../../user/Search";
import EditProductModal from "./EditProductModal";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../redux/slice/admin/AdminProductReducer";
import DisplayImage from "./DisplayImage";
import axios from "axios";
import { deleteDeleteApi } from "../../../utils/api";
import Swal from "sweetalert2";
import { getCategory } from "../../../redux/slice/admin/categoryReducer";
import Loading from "../../Loading";
import Spinner from "../../Spinner";

function AddProduct() {
  const getProduct = useSelector((state) => state.adminProductReducer.product);
  const loading = useSelector((state) => state.adminProductReducer.isLoading);
  const dispatch = useDispatch();
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [data, setData] = useState({});
  const [del,setDel] = useState({
    loading : false,
    id : "",
  });

  const addHandleClose = () => setAddShow(false);
  const addHandleShow = () => setAddShow(true);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getCategory());
  }, []);


  // To pass data in product edit modal in props ways
  const dataPass = (data) => {
    setData(data)


  // // convert base64 to file object
    // let dataurl = `data:${image.mimetype};base64,${image.data}`;
    // let filename = `${image.name}`;

   
    // function dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // }
    // let file = dataURLtoFile(dataurl, filename);

    // setData({ category, file, product, unit, quantity, amount, _id });
  };

  // Delete product
  const deleteProduct = async (id) => {
    
    // sweet alert for delete
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    let swal = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: false,
    });
    if (swal.isConfirmed) {
      try {
        setDel({...del,loading : true, id});
        const value = await axios.delete(`${deleteDeleteApi}/${id}`, {
          headers: {
            authorization: window.localStorage.getItem("token")
          }});
        if (value.status === 200) {
          dispatch(getAdminProduct());
          setDel({...del,loading : false, id : ""});
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `${value.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1300,
          });
        } else {
          setDel({...del,loading : false, id : ""});
          swalWithBootstrapButtons.fire({
            title: "",
            text: `${value.response.data.message}`,
            icon: "error",
            focusConfirm: false,
          });
        }
      } catch (error) {
        setDel({...del,loading : false, id : ""});
        swalWithBootstrapButtons.fire({
          title: "",
          text: `${error.response.data.message}`,
          icon: "error",
          focusConfirm: false,
        });
      }
    }
  };


  return (
    <Container className="addProduct">
      <div className="addpro">
        <Search  lable={"Search product"} fun = {getAdminProduct}/>
        <Button variant="success" onClick={addHandleShow}>
        <i class="fa-solid fa-plus"></i> Add Product
        </Button>
      </div>
      <div className="mt-3 table-responsive">
      {
              loading ? (<div className="d-flex justify-content-center">
                <Loading width ={"3.5rem"}/>
              </div>) :  <Table bordered  className="text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>category</th>
              <th>Product</th>
              <th>Unit</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Picture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

           
            
            {
              getProduct.length > 0 &&
                getProduct.map(
                  (
                    { category, image, product, unit, quantity, amount, _id ,public_id,availableInStock,sold},
                    index
                  ) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td>{product}</td>
                        <td>{unit}</td>
                        <td>{amount}</td>
                        <td>{quantity}</td>
  
                        <td>
                          <DisplayImage image={image} />
                        </td>
  
                        <td className="action-button">
                          <Button
                          variant="warning"
                            onClick={() => {
                              dataPass({
                                category,
                                image,
                                product,
                                unit,
                                quantity,
                                amount,
                                _id,
                                public_id,
                                availableInStock,
                                sold
                              });
  
                              editHandleShow();
                            }}
                          >
                            <i class="fas fa-edit"></i> Edit
                          </Button>{" "}
                          <Button variant="danger" onClick={del.loading ? null : () => deleteProduct(_id)}>
                            {
                              del.id === _id ? 
                              <> {del.loading ? <div style={{minWidth : "60px"}}><Spinner width={"1.2rem"} /></div>: <><i class="fas fa-trash-alt"></i> Delete</>}</> : <><i class="fas fa-trash-alt"></i> Delete</>
                              
                            }
                            
                            
                          
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                )
            }
          </tbody>
        </Table>
            }
       
      </div>
      <AddProductModal
        handleClose={addHandleClose}
        handleShow={addHandleShow}
        show={addShow}
      />
      <EditProductModal
        handleClose={editHandleClose}
        handleShow={editHandleShow}
        show={editShow}
        data={data}
      />
    </Container>
  );
}

export default AddProduct;
