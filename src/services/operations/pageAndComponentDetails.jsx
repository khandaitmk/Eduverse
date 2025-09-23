import { apiConnector } from "../apiConnector"
import { catalogData } from "../apis"

export const getCatalogPageDetails = async (categoryId, token) =>{
    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId},{
            Authorization: `Bearer ${token}`,
        });
        if(!response.data.success){
            throw new Error("Could not fetch the catalog page details");
        }
        console.log("catalog page details api response ",response);
        return response.data.data;
    } catch(error){
        console.log("Error in fetching the catalog page details",error);
    }
};