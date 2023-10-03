import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addressApi } from '../../utils/api';



export const getAddress = createAsyncThunk("status/getAddress", async(id) => {
    try {

      // return async()=>{
      //   let win = window.localStorage.getItem("id")
      //   let data =  await fetch(`${addressApi}/${id || win}`)
      //   console.log(data);
      // }
      // let win = window.localStorage.getItem("id")
      // const response = await fetch(`${addressApi}/${id || win}`)
      // console.log(response.json());
      // return response.json()
      let win = window.localStorage.getItem("id")
        return fetch(`${addressApi}/${id || win}`)
        .then((resp) => resp.json())
    } catch (error) {
      console.log(error);
    }
       
    });


export const statusReducer = createSlice({
  name: 'status',
  initialState: {
    admin: false,
    token : null,
    id : null,
    address : [],
    name : "" || window.localStorage.getItem("name"),
    email : "",
    mobile : "",
    isLoading : false,
  },
  reducers: {
    status : (state,{payload})=>{
        state.admin = payload.isAdmin
        state.token = payload.token
        state.id = payload.id
        state.name = payload.name
        state.email = payload.email
        state.mobile = payload.mobile
    },
    setAddress : (state,{payload})=>{
      state.address = payload
    },
    // clearAddress : (state)=>{
    //   state.address = []
    // }

  },
  extraReducers(builder) {
    builder
      .addCase(getAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.address = action.payload.address;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
})

// Action creators are generated for each case reducer function
export const {status, setAddress } = statusReducer.actions

export default statusReducer.reducer



