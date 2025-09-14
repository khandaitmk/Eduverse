import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,//this is important as if we set it as the null directly then after refrsh the data of the user become null and sb khtm then to persist the user after the refresh we need the local storage......
    loading:false
};

const profileslice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser: (state,value)=>{
            state.user=value.payload;
        },
        setLoading: (state,value) =>{
            state.loading=value.payload;
        }   
    },
});

export const {setUser}=profileslice.actions;
export default profileslice.reducer;  