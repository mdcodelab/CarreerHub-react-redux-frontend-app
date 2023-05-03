import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../user/userSlice';



const initialState={
        isLoading: false,
        position: "",
        company: "",
        jobLocation: "",
        jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
        jobType: "full-time",    //default value of jobTypeOptions
        statusOptions: ["interview", "declined", "pending"],
        status: "pending",  //default value of statusOptions
        isEditing: false,
        editJobId: ""
}

export const createJob = createAsyncThunk('job/createJob', async (job, thunkAPI) => {
      try {
        const resp = await customFetch.post('/jobs', job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            //authorization: `Bearer`,
          },
        });
        thunkAPI.dispatch(handleClear());
        return resp.data;
      } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
          }
        // basic setup
        return thunkAPI.rejectWithValue(error.response.data.msg);
        console.log(error);
      }
    }
  );

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            return {...state, [name]: value};
        },
        handleClear: (state) => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(createJob.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(createJob.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            toast.success("Job Created!");
          })
          .addCase(createJob.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
          });
      }
})




export const {handleChange, handleClear}=jobSlice.actions;

export default jobSlice.reducer;