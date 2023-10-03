let   host = "https://glocery-backend.vercel.app";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   host = "http://localhost:4000"
// } else {

// }

export const api = `${host}`;

// Category api
export const getCategoryApi = `${host}/dashboard/getCategory`;
export const getSelectedCategoryApi = `${host}/dashboard/getCategory`;
export const addCategoryApi = `${host}/dashboard/setCategory`;
export const editCategoryApi = `${host}/dashboard/editCategory`;
export const deleteCategoryApi = `${host}/dashboard/deleteCategory`;



// product api 
export const addProductApi = `${host}/dashboard/addProduct`;
export const getAdminProductApi = `${host}/dashboard/getProduct`;
export const getAdminSelectedProductApi = `${host}/dashboard/getProduct`;
export const editEditApi = `${host}/dashboard/editProduct`;
export const deleteDeleteApi = `${host}/dashboard/deleteProduct`;




// auth api 
export const register = `${host}/auth/register`;
export const login = `${host}/auth/login`;
export const forgotPassword = `${host}/auth/forgotPassword`;
export const passwordResetPage = `${host}/auth/passwordResetPage`;
export const sendOtp = `${host}/auth/sendOtp`;
export const otpVerification = `${host}/auth//otpVerification`;






// address api
export const addAddressApi = `${host}/user/addAddress`;
export const addressApi = `${host}/user/address`;
export const editAddressApi = `${host}/user/editAddress`;
export const deleteAddressApi = `${host}/user/deleteAddress`;
export const setProfile = `${host}/user/profileImage`;
export const getProfileImage = `${host}/user/profilePic`;
export const setProfileName = `${host}/user/profileName`;
export const getProfileName = `${host}/user/getProfileName`;
export const changePassword = `${host}/user/changePassword`;
export const profileDetails = `${host}/user/profileDetails`;





// order api

export const addOrder = `${host}/order/addOrder`;
export const yourOrder = `${host}/order/yourOrders`;
export const tokenChecker = `${host}/order/tokenChecker`;




// dashboard api


export const dashboardOverview = `${host}/dashboard/dashboardOverview`;
export const dashboardProducts = `${host}/dashboard/dashboardProduct`;
export const users = `${host}/dashboard/user`;
export const orderdetails = `${host}/dashboard/order-details`;




export const header = {
  headers: {
    authorization: window.localStorage.getItem("token")
  }
}

