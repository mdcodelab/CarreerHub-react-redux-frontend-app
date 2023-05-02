import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {customFetch} from "../../utils/axios";
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState={
        isLoading: false,
        position: "",
        company: "",
        jobLocation: "",
        jobTypeOptions: ["Full-time", "Part-time", "Remote", "Internship"],
        jobType: "Full-time",    //default value of jobTypeOptions
        statusOptions: ["Interview", "Declined", "Pending"],
        status: "Pending",  //default value of statusOptions
        isEditing: false,
        editJobId: ""
}

const jobSlice = createSlice({
    name: "job",
    initialState
})

export default jobSlice.reducer;