import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoryApi, getSelectedCategoryApi } from "../../../utils/api";

const initialState = {
    category: [],
    selectCategory: {},
    isLoading : false,
};

export const getCategory = createAsyncThunk("category/getCategory", async(query) => {
try {
  if(!query){
    return fetch(getCategoryApi)
    .then((resp) => resp.json())
  }else{
    return fetch(`${getSelectedCategoryApi}/${query}`)
    .then((resp) => resp.json())
  }
} catch (error) {
  console.log(error);
}
   
});

export const categoryReducer = createSlice({
    name: "category",
    initialState,
    reducers: {
        category: (state, action) => { },
        addCategory: (state, action) => { },
        selectCategory: (state, action) => {
            state.selectCategory = action.payload
         },
        deleteCategory: (state, action) => { },
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
          .addCase(getCategory.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(getCategory.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.category = action.payload.data;
          })
          .addCase(getCategory.rejected, (state, action) => {
            state.isLoading = false;
          })
      }
});



// Action creators are generated for each case reducer function
export const { category, addCategory, selectCategory, deleteCategory } =
    categoryReducer.actions;

export default categoryReducer.reducer;
