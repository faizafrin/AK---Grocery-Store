import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/user/productReducer'
import cartReducer from './slice/user/cartReducer'
import toggleReducer from './slice/toggleReducer'
import categoryReducer from './slice/admin/categoryReducer'
import adminProductReducer from './slice/admin/AdminProductReducer';
import statusReducer from './slice/statusReducer'




export default configureStore({
  reducer: {
    productReducer,
    cartReducer,
    toggleReducer,
    categoryReducer,
    adminProductReducer,
    statusReducer,
  },
})