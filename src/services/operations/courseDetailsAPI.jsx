import { courseEndpoints } from "../apis";
import {apiConnector} from "../apiConnector";

const {COURSE_CATEGORIES_API}=courseEndpoints;
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
