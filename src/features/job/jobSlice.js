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
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            return {...state, [name]: value};
        },
        handleClear: (state) => {
            return initialState
        }

    }
})

export const {handleChange, handleClear}=jobSlice.actions;

export default jobSlice.reducer;