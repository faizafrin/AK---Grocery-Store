import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    let win = useSelector((state) => state.statusReducer.token);
    let isLogin = win || window.localStorage.getItem("token")
    let ee = useSelector((state) => state.statusReducer.id);
    let id = ee || window.localStorage.getItem("id")
if(isLogin || id){
   return  children
}
return <Navigate to = "/login"/>
}

export default PrivateRoute