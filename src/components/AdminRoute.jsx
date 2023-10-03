import { useSelector } from 'react-redux';

function AdminRoute({children}) {
    const admin = useSelector((state) => state.statusReducer.admin);
let win =  window.localStorage.getItem("isAdmin")
    if (admin || win === "true") {
        console.log("adminRoute",win);
      return children;
    } 
    return null;
}

export default AdminRoute