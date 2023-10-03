import { createSlice } from '@reduxjs/toolkit'
import Toast from '../../../components/toast'


export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: {
    cart: [],
    total : 0,
    buyNow : {},
  },
  reducers: {
clearCart : (state)=>{
state.cart = [];
state.total = 0;
},

    addToCart: (state,action) => {
        let data = state.cart.find((item)=>item._id === action.payload._id)
        if(data){
           if(data.availableInStock > data.dummyQuantity){
            data.dummyQuantity = data.dummyQuantity + 1;
            data.dummyTotal = data.dummyTotal + (1 * data.amount)
            state.total = state.total + action.payload.amount;
           }else{
            Toast.fire({
              icon: "warning",
              title: `Only ${data.availableInStock} quantity is stock`,
            });
           }
        }else{
          if(action.payload.availableInStock === 0 ){
            Toast.fire({
              icon: "warning",
              title: `Out of stock`,
            });
           
          }else{
            state.total = state.total + action.payload.dummyTotal;
            state.cart.push(action.payload);
          }
        }
    },
    deleteToCart : (state,action)=>{
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      state.total = state.total - action.payload.dummyTotal; 
    },
    cartIncrement : (state,action)=>{
    if(action.payload.availableInStock > action.payload.dummyQuantity){
      let data = state.cart.find((item)=>item._id === action.payload._id)
      data.dummyQuantity = data.dummyQuantity + 1; // done
      data.dummyTotal = data.dummyTotal + (1 * data.amount)
      state.total = state.total + action.payload.amount;
    }else{
      Toast.fire({
        icon: "warning",
        title: `Only ${action.payload.availableInStock} quantity is stock`,
      });
    }
    },
    cartDecrement : (state,action)=>{
    if(action.payload.dummyQuantity === 1){
      Toast.fire({
        icon: "warning",
        title: "minimum one quantity is required",
      });
    }else{
      let data = state.cart.find((item)=>item._id === action.payload._id)
      data.dummyQuantity = data.dummyQuantity - 1;
      data.dummyTotal = data.dummyTotal - (1 * data.amount)
      state.total = state.total - action.payload.amount;
    }
    },
    addToBuyNow : (state,action)=>{
      state.buyNow = action.payload
      // if(action.payload.availableInStock === 0 ){
      //   Toast.fire({
      //     icon: "warning",
      //     title: `Out of stock`,
      //   });
       
      // }else{
      //   state.buyNow = action.payload
      // }

    },

    buyNowIncrement : (state,{payload})=>{
      if(state.buyNow.availableInStock > payload){
        state.buyNow.dummyQuantity = payload + 1;
        state.buyNow.dummyTotal = state.buyNow.dummyTotal + (1 * state.buyNow.amount)
      }else{
        Toast.fire({
          icon: "warning",
          title: `Only ${state.buyNow.availableInStock} quantity is stock`,
        });
      }
         
    },
    buyNowDecrement : (state,{payload})=>{
      if(payload === 1){
        Toast.fire({
          icon: "warning",
          title: "minimum one quantity is required",
        });
      }else{
        state.buyNow.dummyQuantity = payload - 1;
        state.buyNow.dummyTotal = state.buyNow.dummyTotal - (1 * state.buyNow.amount)
      }
      },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteToCart, cartDecrement, cartIncrement, buyNowIncrement, buyNowDecrement, addToBuyNow, clearCart} = cartReducer.actions

export default cartReducer.reducer