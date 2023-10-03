import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { setMenuToggle } from "./redux/slice/toggleReducer";
import { useDispatch, useSelector } from "react-redux";

//Admin
import DashBoard from "./components/admin/dashboard";
import AddCategories from "./components/admin/categories";
import AddProduct from "./components/admin/product";
import AdminUser from "./components/admin/user";
import OrderDetails from "./components/admin/user/OrderDetails";


//  auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";

//User
import Product from "./components/user/product";
import Home from "./components/user/Home";
import Address from "./components/user/address/Address";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import ProductItem from "./components/user/product/ProductItem";
import OrderSuccess from "./components/user/orderSuccess/OrderSuccess";
import YourOrder from "./components/user/yourOrder";
import Profile from "./components/user/profile/Profile";
import Otp from "./components/auth/otp/Otp";




import { getAdminSelectedProductApi } from "./utils/api";
import axios from "axios";
import PreLoading from "./components/preLoading/PreLoading";









function App() {
const [load,setLoad] = useState(true)
  const dispatch = useDispatch();
  // onWheel={()=> dispatch(setCartToggle(false))}
  // ; dispatch(setCartToggle(false))}

useEffect(()=>{
console.log("sivanathan.........");
db()
},[])
const db = async()=>{
try {
  const {status,data} = await axios.get(`${getAdminSelectedProductApi}/?category=""&search=""`)
if(status === 200){
  setLoad(false)
}
} catch (error) {
  console.log(error);
}
}
{/* <div className="d-flex justify-content-center align-items-center" style={{minHeight : "100vh"}} > <Loading width = {"8rem"} /> </div>  */}
  return (
    <div
      onWheel={() => {
        dispatch(setMenuToggle(false));
      }}
    >
      {
        load ? <PreLoading />: <BrowserRouter>
        <AdminRoute  >
          <Routes>  
            {/* admin */}
            <Route path="/dashboard" element={<Admin/>}>
            <Route  index element={<DashBoard />} />
            <Route path="addCategories" element={<AddCategories />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="view-order/:id" element={<OrderDetails/>} />
            </Route>
          </Routes>
        </AdminRoute>



 {/* // user */}
          <Routes>
            <Route  path="/" element={<User />}>
            <Route index element={<Home/>} />
            
            <Route path="product" element={<Product />} />
            <Route path="p/:name" element={<ProductItem />} />
            

            <Route path="place-order/:which" 
             
            element={
              <PrivateRoute>
              <Address />
              </PrivateRoute>
            } />
             <Route path="/your-order" element={
            <PrivateRoute>
            <YourOrder/>
            </PrivateRoute>} 
            />
            </Route>
            <Route path="/orderSuccess" element={
            <PrivateRoute>
            <OrderSuccess/>
            </PrivateRoute>} 
            />
           

           <Route path="/profile" element={
            <PrivateRoute>
            <Profile/>
            </PrivateRoute>
            } 
            />
            </Routes>
         
          
            <Routes>

        
           {/* auth */}
           <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:user/:token" element={<ForgotPasswordPage />} />
            {/* <Route path="*" element={<ErrorPage/>} /> */}
            <Route path="/otp" element={<Otp />} />
        </Routes>
    
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
