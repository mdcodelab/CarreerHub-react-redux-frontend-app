import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage} from "../../utils/localStorage"


const initialState={
isLoading: false,
user: getUserFromLocalStorage(),
isSidebarOpen: false
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
    try {
        const response = await customFetch.post("/auth/login", user);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);//set from API
        return thunkAPI.rejectWithValue(error.response.data.msg)
        console.log(error.response);
    }
})

const userSlice=createSlice({
name: "user",
initialState,
reducers : {
toggleSidebar:  (state) => {
state.isSidebarOpen = !state.isSidebarOpen;
},
logoutUser: (state) => {
state.user=null
state.isSidebarOpen=false
localStorage.removeItem("user")
}
},
extraReducers: (builder) => {
    builder
    //registerUser
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true;})

        .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello There ${user.name}!`);
          })

          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })  
          //loginUser
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;})
    
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome back ${user.name}!`);
              })
    
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              })  
}
})

export const {toggleSidebar, logoutUser} = userSlice.actions

export default userSlice.reducer;

console.log(userSlice.reducer);
