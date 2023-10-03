import React, { useEffect, useState } from "react";
import './user.css'
import { Button, Container, Table } from "react-bootstrap";
import Search from "../../user/Search";
import Spinner from "../../Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../../redux/slice/admin/AdminProductReducer";
import { useDispatch, useSelector } from "react-redux";


function User() {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const data = useSelector((state) => state.adminProductReducer.userDetails);
//   const loading = useSelector((state) => state.categoryReducer.isLoading);





  useEffect(()=>{
    dispatch(getUserDetails())
    //    getUser()
  },[])


  return (
    <Container className="addCategories">
      <div className="addcat">
        <div></div>
        <Search  fun={ getUserDetails } lable={"Search a user"} />
      </div>
      <div className="mt-3 userRespomsive">
        <Table bordered  className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th className="ggg">Order</th>
            </tr>
          </thead>
          <tbody>
            
            {
              loading ? <Spinner width={"4rem"}/> : data.length > 0 && data ? (  data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.roll ? "Admin" : "user"}</td>
                    <td><Button variant="info" onClick={()=>navigate(`/dashboard/view-order/${item.id}`)}><i class="fa-sharp fa-solid fa-eye"></i> View order</Button></td>

                  </tr>
                );
              })) : (<tr>No record found</tr>)
            
            }
            
          </tbody>
        </Table>
      </div>
   
    </Container>
  );
}

export default User;
