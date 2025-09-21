import { courseEndpoints } from "../apis";
import {apiConnector} from "../apiConnector";
import { setCourse, updateCourseInList } from "../../slices/courseSlice";
import toast from "react-hot-toast";
const {COURSE_CATEGORIES_API,EDIT_COURSE_API,CREATE_COURSE_API,CREATE_SECTION_API,UPDATE_SECTION_API,DELETE_SECTION_API,CREATE_SUBSECTION_API,GET_ALL_INSTRUCTOR_COURSES_API}=courseEndpoints;
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

export const editCourseDetails = async (data, token,dispatch) => {
    const toastId = toast.loading("Updating course details...");
    try {
        console.log("course ID :", ...data);
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error("not able to Edit the course");
        }
        console.log("this is after the edit course", response);
        dispatch(setCourse(response.data.data));
        dispatch(updateCourseInList(response.data.data));
        toast.dismiss(toastId);
        toast.success("Course updated successfully");

        // here we are not returning the result so first check the response and then return for temp. we are returning
        return response.data.data;
    } catch (error) {
        console.log("Error occursed in the edit course operation", error);
        toast.dismiss(toastId);
        toast.error("Failed to update course details");
    }
};



export const addCourseDetails = async (data,token) =>{
    const toastId = toast.loading("Creating course...");
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("not able to create the course");
        }
        console.log("course after created",response);
        toast.dismiss(toastId);
        toast.success("Course created successfully");
        return (response.data.updatedCourse);
    } catch(error){
        console.log("Error occured in the course creation operation ",error);
        toast.dismiss(toastId);
        toast.error("Failed to create course");
    }
};

export const createSection= async (data,token,dispatch) =>{
    const toastId = toast.loading("Creating section...");
    try{
        const response = await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in creation of Section");
        }
        // console.log("Response after creation of section",response.data.data);
        dispatch(setCourse(response.data.data));
        toast.dismiss(toastId);
        toast.success("Section created successfully");
        return (response.id);
    } catch(error){
        console.log("Error in creation of the Section",error);
        toast.dismiss(toastId);
        toast.error("Failed to create section");
    }
}

export const editSection = async(data,token,dispatch) =>{
    const toastId = toast.loading("Updating section...");
    try{
        const response = await apiConnector("POST",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error occured in updation of the section ")
        }
        // console.log("edited section :",response.data.updatedCourse);
        dispatch(setCourse(response.data.updatedCourse));
        toast.dismiss(toastId);
        toast.success("Section updated successfully");
    } catch(error){
        console.log("Error in editing section",error);
        toast.dismiss(toastId);
        toast.error("Failed to update section");
    }
};
export const deletSection = async(data,token,dispatch) =>{
    const toastId = toast.loading("Deleting section...");
    try{
        const response =await apiConnector("POST",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error ("Error in deletion of the section");
        }
        console.log("response after the deletion :",response.data.updatedCourse);
        dispatch(setCourse(response.data.updatedCourse));
        toast.dismiss(toastId);
        toast.success("Section deleted successfully");
    } catch (error){
        console.log("Error in the delete section ",error);
        toast.dismiss(toastId);
        toast.error("Failed to delete section");
    }
};

export const createSubSection = async(data,token,dispatch)=>{
    const toastId = toast.loading("Creating subsection...");
    try{
        const formData=new FormData();
        formData.append("title",data.title);
        formData.append("timeDuration",data.timeDuration);
        formData.append("description",data.description);
        formData.append("videoFile",data.videoFile);
        formData.append("sectionId",data.sectionId);
        console.log("form data in the subsection api",data.videoFile);
        const response = await apiConnector("POST",CREATE_SUBSECTION_API,formData,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in creation of the subSection");
        }
        console.log("response after creation of the subsection",response.data.updatedCourse);
        dispatch(setCourse(response.data.updatedCourse));
        toast.dismiss(toastId);
        toast.success("Subsection created successfully");
    } catch(error){
        console.log("Error in creation of the subsection",error);
        toast.dismiss(toastId);
        toast.error("Failed to create subsection");
    }
};

export async function getAllInstructorCourses(token){
    try{
        const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in fetching the instructor courses");
        }
        console.log("instructor courses api response",response.data.data);
        return response.data.data;
    } catch(error){
        console.log("Error in fetching the instructor courses",error);
    }
};