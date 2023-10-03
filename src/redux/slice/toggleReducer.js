import { createSlice } from '@reduxjs/toolkit'


export const toggleReducer = createSlice({
  name: 'toggle',
  initialState: {
    cartToggle: false,
    menuToggle: false,
  },
  reducers: {
    setCartToggle : (state,action)=>{
        state.cartToggle = action.payload;
    },

    setMenuToggle : (state,action)=>{
      // console.log("Current state",current(state));
      state.menuToggle = action.payload;
      // console.log("update state",current(state));
  }

  },
})

// Action creators are generated for each case reducer function
export const { setCartToggle, setMenuToggle } = toggleReducer.actions

export default toggleReducer.reducer