import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardProducts, getAdminProductApi, users } from "../../../utils/api";

const initialState = {
    product: [],
    isLoading : false,
    dashboardProduct : [],
    userDetails : [],
};

export const getAdminProduct = createAsyncThunk("adminProduct/getAdminProduct", async(query) => {
try {
  if(!query){
    return fetch(getAdminProductApi)
    .then((resp) => resp.json())
  }else{
    return fetch(`${getAdminProductApi}/?search=${query}`)
    .then((resp) => resp.json())
  }
} catch (error) {
  console.log(error);
}
   
});

export const getDashboardProduct = createAsyncThunk("adminProduct/getDashboardProduct",async(q)=>{
  try {
            const { stock, product } = q
            let data = await fetch(`${dashboardProducts}/?product=${product}&stock=${stock}`)
            return await data.json();
      } catch (error) {
        console.log(error);
      }
})



export const getUserDetails = createAsyncThunk("adminProduct/getUserDetails",async(user)=>{
  try {
          if(user){
            let data = await fetch(`${users}/?user=${user}`)
            return await data.json();
          }else{
            let data = await fetch(users)
            return await data.json();
          }
      } catch (error) {
        console.log(error);
      }
})
export const adminProductReducer = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {
      cat : ()=>{

      }
    },
    // extraReducers: {
    //     [getCategory.pending]: (state, action) => {
    //         state.isLoading = true;
    //     },
    //     [getCategory.fulfilled]: (state, action) => {
    //         console.log(current(state));
    //         state.isLoading = false;
    //         state.category = action.payload.data;
    //     },
    //     [getCategory.rejected]: (state, action) => {
    //         state.isLoading = false;
    //     }
    // }
    extraReducers(builder) {
        builder
          .addCase(getAdminProduct.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(getAdminProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.product = action.payload.data;
          })
          .addCase(getAdminProduct.rejected, (state, action) => {
            state.isLoading = false;
          }) 
          .addCase(getDashboardProduct.fulfilled, (state, action) => {
                    state.dashboardProduct = action.payload;
          })
          .addCase(getUserDetails.fulfilled, (state, action) => {
            state.userDetails = action.payload;
  })
      }
});



// Action creators are generated for each case reducer function
export const {  cat} =
    adminProductReducer.actions;

export default adminProductReducer.reducer;
