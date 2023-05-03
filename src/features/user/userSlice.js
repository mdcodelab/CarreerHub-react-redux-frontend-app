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
      if(error.response.status = 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
        //toast.error(error.response.data.msg);//set from API
        return 

    }
})



export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
      try {
        const resp = await customFetch.patch('/auth/updateUser', user, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            //authorization: `Bearer`
          },
        });
        return resp.data;
      } catch (error) {
        //console.log(error.response);
        if(error.response.status === 401) {  //authentication error (happens when we remove the token)
                thunkAPI.dispatch(logoutUser());
                //toast.warning("Unauthorized! Logging out ...");
                return thunkAPI.rejectWithValue("Unauthorized! Logging out ...");
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

const userSlice=createSlice({
name: "user",
initialState,
reducers : {
toggleSidebar:  (state) => {
state.isSidebarOpen = !state.isSidebarOpen;
},
logoutUser: (state, {payload}) => {
state.user=null
state.isSidebarOpen=false
localStorage.removeItem("user");
if(payload) {
  toast.success("Logging Out...")
}
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
              //update user 
              .addCase(updateUser.pending, (state) => {
                state.isLoading = true;})
        
                .addCase(updateUser.fulfilled, (state, { payload }) => {
                    const { user } = payload;
                    state.isLoading = false;
                    state.user = user;
                    addUserToLocalStorage(user);
                    toast.success("User Updated!");
                  })
        
                .addCase(updateUser.rejected, (state, { payload }) => {
                    state.isLoading = false;
                    toast.error(payload);
                  }) 
}
})

export const {toggleSidebar, logoutUser} = userSlice.actions

export default userSlice.reducer;

//console.log(userSlice.reducer);


