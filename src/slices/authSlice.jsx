import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    signUpData:null,
    loading:false

};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken: (state,value)=>{
            state.token=value.payload;
        },
        setSignUpData:(state,value)=>{
            state.signUpData =value.payload
        },
        setLoading:(state,value)=>{
            state.loading=value.payload;
        },clearAuth: (state) => {
            state.token = null;
            state.signUpData = null;
            state.loading = false;
            localStorage.removeItem("token");
        },   
    },
});

export const {setToken,setSignUpData,setLoading,clearAuth}=authSlice.actions;
export default authSlice.reducer;  