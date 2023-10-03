import React from 'react'
import { useSelector } from 'react-redux';

function UserRoute({children}) {
    const admin = useSelector((state) => state.statusReducer.admin);
let win =  window.localStorage.getItem("isAdmin")
    if (admin || win === "false") {
        console.log("uuuuuuuuuuuu....")
      return children;
    } 
    return children;
}

export default UserRoute