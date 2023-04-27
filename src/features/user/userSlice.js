import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';


const initialState={
isLoading: false,
user: null
}

export const registerUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
    console.log(`register user ${user}`)
    try {
        //const response = await customFetch.post("/auth/testingRegister", user)
        const response= await customFetch.post("/auth/register", user);
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);//set from API
        return thunkAPI.rejectWithValue(error.response.data.msg)
        console.log(error.response);
    }
})

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    //console.log(`login user ${user}`)
} )

const userSlice=createSlice({
name: "user",
initialState,
extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true;})

        .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            toast.success(`Hello There ${user.name}`);
          })

          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
    
}

})

export default userSlice.reducer;

console.log(userSlice.reducer)
