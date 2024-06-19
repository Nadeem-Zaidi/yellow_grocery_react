import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from '@reduxjs/toolkit';


const categoryInitial = {
    categories: [],
    status: 'idle',
    error: null,
}

const categorySlice = createSlice({
    name: 'category',
    categoryInitial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});


export default categorySlice.reducer;

