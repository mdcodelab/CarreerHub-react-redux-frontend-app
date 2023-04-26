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
        const response = await customFetch.post("/auth/testingRegister", user)
        console.log(response);
    } catch (error) {
        toast.error(error.response.data.msg);//set from API
        console.log(error.response);
    }
})

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    //console.log(`login user ${user}`)
} )

const userSlice=createSlice({
name: "user",
initialState
})

export default userSlice.reducer;

console.log(userSlice.reducer)
