import { courseEndpoints } from "../apis";
import {apiConnector} from "../apiConnector";
import { setCourse } from "../../slices/courseSlice";
const {COURSE_CATEGORIES_API,EDIT_COURSE_API,CREATE_COURSE_API,CREATE_SECTION_API}=courseEndpoints;
export const fetchCourseCategories = async() =>{
    let result=[];
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API);
        if(!response.data.success){
            throw new Error("Could not fetch the categories");
        }
        result=response.data.data;
        console.log("course categories api response ",result);
        return result;
    } catch(error){
        console.log("Error occured in the fetch categories",error);

    }
};

export const editCourseDetails = async (data) => {
    try{
        const response = await apiConnector("POST",EDIT_COURSE_API,data);
        if(!response.data.success){
            throw new Error("not able to Edit the course");
        }
        console.log(response);
        // here we are not returning the result so first check the response and then return for temp. we are returning
        return (response.data.data);
    } catch( error){
        console.log("Error occursed in the edit course operation",error);
    }
};

export const addCourseDetails = async (data,token) =>{
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("not able to create the course");
        }
        console.log(response);
        return (response.data.newCourse);
    } catch(error){
        console.log("Error occured in the course creation operation ",error);
    }
};

export const createSection= async (data,token,dispatch) =>{
    try{
        const response = await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in creation of Section");
        }
        console.log("Response after creation of section",response.data.data);
        dispatch(setCourse(response.data.data));
        return (response.id);
    } catch(error){
        console.log("Error in creation of the Section",error);
    }
}

export const updateSection = async() =>{

};