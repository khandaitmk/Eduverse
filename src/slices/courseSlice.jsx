import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    step:1,
    course:null,
    editCourse:false,
    paymentLoading:false,
    instructorCourses:[]
};

const courseSlice =createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep : (state,action) =>{
            state.step = action.payload
        },
        setCourse : (state,action) => {
            state.course=action.payload
        },
        setEditCourse: (state,action) =>{
            state.editCourse = action.payload
        },
        setPaymentLoading : (state,action) => {
            state.paymentLoading =action.payload
        },
        setInstructorCourses: (state,action) => {
            state.instructorCourses = action.payload
        },
        updateCourseInList: (state,action) => {
            const updatedCourse = action.payload;
            const index = state.instructorCourses.findIndex(course => course._id === updatedCourse._id);
            if(index !== -1) {
                state.instructorCourses[index] = updatedCourse;
            }
        },
        resetCourseState: (state) => {
            state.step=1;
            state.course=null;
            state.editCourse=false;
            state.paymentLoading=false;
        }
    }
});

export const {setStep,setCourse,setEditCourse,setPaymentLoading,setInstructorCourses,updateCourseInList,resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;