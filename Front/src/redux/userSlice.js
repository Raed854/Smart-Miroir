import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getAllUsers = createAsyncThunk ("getAllUsers",async ()=>{
    try {
        const data = await axios.get(`${API_BASE_URL}/user/`);
        return data.data;
    } catch (error) {
        return error;
    }
})

export const getAllUsersByCompany = createAsyncThunk ("getAllUsersByCompany ",async ()=>{
    try {
        const companyId = JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company;
        const data = await axios.get(`${API_BASE_URL}/company/${companyId}/user/`);
        return data.data;
    } catch (error) {
        return error;
    }
})

export const getAllScoring = createAsyncThunk ("getAllScoring",async ()=>{
    try {
        const data = await axios.get(`${API_BASE_URL}/pointage/`);
        return data.data;
    } catch (error) {
        return error;
    }
})

export const getAllScoringbyCompany = createAsyncThunk ("getAllScoringbyCompany",async ()=>{
    try {
        const companyId = JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company;
        const data = await axios.get(`${API_BASE_URL}/pointage/${companyId}/`);
        return data.data;
    } catch (error) {
        return error;
    }
})

const userSlice = createSlice ({
    name:"userSlice" ,
    initialState:null,
    reducers : {
        getAllUsers : getAllUsers,
        getAllScoring  : getAllScoring ,
        
    }
});










export default userSlice.reducer;