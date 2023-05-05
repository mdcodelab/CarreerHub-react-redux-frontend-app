import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from '../../utils/localStorage';
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

  export const editJob = createAsyncThunk("allJobs/editJob", async({jobId, job}, thunkAPI) => {
    try {
        const response = await customFetch.patch(`/jobs/${jobId}`, job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`  
                }
        })
            return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error editing the job!");
    }
  })



const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            return {...state, [name]: value};
        },
        handleClear: (state) => {
            return {...initialState, jobLocation: getUserFromLocalStorage()?.location || "" }
        },
        setEditJob: (state, {payload}) => {
          return {...state, isEditing: true, ...payload}
        }
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
          })
          //edit job
          .addCase(editJob.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(editJob.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            toast.success("Job Modified!");
          })
          .addCase(editJob.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
          })

      }
})




export const {handleChange, handleClear, setEditJob}=jobSlice.actions;

export default jobSlice.reducer;