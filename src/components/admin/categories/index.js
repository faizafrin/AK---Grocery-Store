import React, { useEffect, useState } from "react";
import "./categories.css";
import { Button, Container, Table } from "react-bootstrap";
import Search from "../../user/Search";
import EditCategoryModal from "./EditCategoryModal";
import AddCategoryModal from "./AddCategoryModal";
import { getCategory } from "../../../redux/slice/admin/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteCategoryApi } from "../../../utils/api";
import Loading from "../../Loading";
import Spinner from "../../Spinner";


function AddCategories() {
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [data, setData] = useState("");
  const [del,setDel] = useState({
    loading : false,
    id : "",
  });
  const addHandleClose = () => setAddShow(false);
  const addHandleShow = () => setAddShow(true);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);
  const dispatch = useDispatch();

  // To get the data in reducer
  const category = useSelector((state) => state.categoryReducer.category);
  const loading = useSelector((state) => state.categoryReducer.isLoading);

  // To call the Category api when  compount is mount
  useEffect(() => {
    dispatch(getCategory());
  }, []);


  // Delete the category
  const handleDelete = async (id) => {
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
        const value = await axios.delete(
          `${deleteCategoryApi}/${id}`, {
            headers: {
              authorization: window.localStorage.getItem("token")
            }}
        );
        if (value.status === 200) {
          dispatch(getCategory());
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
            icon: "warning",
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
    <Container className="addCategories">
      <div className="addcat">
        <Search  fun={ getCategory } lable={"Search a category"} />
        <Button variant="success" onClick={addHandleShow}>
        <i class="fa-solid fa-plus"></i> Add Categories
        </Button>
      </div>
      <div className="mt-3">

      {
              loading ?<div className="d-flex justify-content-center"><Loading width ={"3.5rem"}/> </div> : category.length > 0 && category ? (  <Table bordered  className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Categories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
               
                {
                  category.map(({ _id, category }, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td>
                          <Button
                          variant="warning"
                            onClick={() => {
                              setData({ _id, category });
                              editHandleShow();
                            }}
                          >
                            <i class="fas fa-edit"></i> Edit
                          </Button>{" "}
                          <Button variant="danger" onClick={del.loading ? null : () => handleDelete(_id)}>
                          {
                              del.id === _id ? 
                              <> {del.loading ? <div style={{minWidth : "60px"}}><Spinner width={"1.2rem"} /></div>: <><i class="fas fa-trash-alt"></i> Delete</>}</> : <><i class="fas fa-trash-alt"></i> Delete</>
                              
                            }
                            </Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table> ) : (<tr>No record found</tr>)
            
            }
       
      </div>
      <AddCategoryModal
        handleClose={addHandleClose}
        handleShow={addHandleShow}
        show={addShow}
      />
      <EditCategoryModal
        handleClose={editHandleClose}
        handleShow={editHandleShow}
        show={editShow}
        data={data}
      />
    </Container>
  );
}

export default AddCategories;
