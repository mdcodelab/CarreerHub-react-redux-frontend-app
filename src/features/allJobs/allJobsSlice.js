import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from "../../utils/axios";


const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  };
  
  const initialState = {
    isLoading: true,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
  };

  export const getAllJobs = createAsyncThunk("allJobs/getJobs", async (_, thunkAPI) => {
    try {
        const response = await customFetch.get("/jobs", {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        //console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error");
    }
  })

  export const deleteJob = createAsyncThunk("allJobs/deleteJob", async(id, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/jobs/${id}`, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error deleting the job");
    }
  })


const allJobsSlice = createSlice({
    name: "allJobs",
    initialState,
    extraReducers: (builder) => {
        builder
        //get all jobs
        .addCase(getAllJobs.pending, (state) => {
            state.isLoading =true;
        })
        .addCase(getAllJobs.fulfilled, (state, {payload}) => {
           state.isLoading=false;
           state.jobs=payload.jobs;
        })
        .addCase(getAllJobs.rejected, (state, {payload}) => {
            state.isLoading=false;
            toast.error(payload);
         })
         //delete a job
         .addCase(deleteJob.pending, (state) => {
            state.isLoading =true;
        })
        .addCase(deleteJob.fulfilled, (state, {payload}) => {
           state.isLoading=false;
           state.jobs=state.jobs.filter((job) => ( job._id != payload._id))
           toast.success("Job Deleted!");
        })
        .addCase(deleteJob.rejected, (state, {payload}) => {
            state.isLoading=false;
            toast.error(payload);
         })
    }
});

export default allJobsSlice.reducer;






