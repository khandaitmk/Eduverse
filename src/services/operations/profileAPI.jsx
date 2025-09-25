    import React from 'react'
    import { apiConnector } from '../apiconnector';
    import { profileEndpoints, settingsEndpoints } from '../apis'
    import { setUser } from '../../slices/profileSlice';
    import {toast} from "react-hot-toast";
    import { logOut } from './authAPI';

    export function changeProfileImage({image,token}){
        return async(dispatch)=>{
            const toastId = toast.loading("Updating profile image...");
            try{
                const formData=new FormData();
                formData.append("image",image);
                // console.log(token);
                const response=await apiConnector("POST",settingsEndpoints.UPDATE_PROFILEIMAGE_API,formData,{
                    Authorization: `Bearer ${token}`
                });
                console.log("Changed profile image ::",response);
                const updatedUser=response.data.user;
                dispatch(setUser(updatedUser));
                localStorage.setItem("user",JSON.stringify(updatedUser));
                if(!response){
                    throw new Error(response.data.message);
                }
                 toast.dismiss(toastId);
            toast.success("Profile image updated successfully ");
            } catch(error){
                console.log("Chnage profile error ",error);
                toast.dismiss(toastId);
                toast.error("Failed to update profile image");
            }       
        }
    };

    export function updateProfileData(data,token,navigate){
        return async(dispatch)=>{
            const toastId = toast.loading("Updating profile details...");
            try{
                  const {firstName,lastName,dateOfBirth,gender,contactNumber,about}=data;
                const response=await apiConnector("PUT",settingsEndpoints.UPDATE_PROFILEDATA_API,{gender:data.gender,dateOfBirth:data.dateOfBirth,about:data.about,contact:data.contact},{
                    Authorization:`Bearer ${token}`
                });
                if(!response.data.success){
                    throw new Error("failed to update the profile details")
                }
                console.log("profile details:",response);
                const user = JSON.parse(localStorage.getItem("user"));  
                // user.firstName = firstName || user.firstName;
                // user.lastName = lastName || user.lastName;
                console.log("resppppp",user.additionalDetails.contact);
                user.additionalDetails.dateOfBirth =response.data.profileDetails.dateOfBirth;
                user.additionalDetails.contact = response.data.profileDetails.contact;
                user.additionalDetails.about = response.data.profileDetails.about;
                user.additionalDetails.gender=response.data.profileDetails.gender
                localStorage.setItem("user",JSON.stringify(user));
                dispatch(setUser(user));
                navigate("/dashboard/my-profile");
                toast.dismiss(toastId);
                toast.success("Profile details updated successfully");

            } catch(error){
                console.log("ERROR from the update profile Data Api :",error);
                toast.dismiss(toastId);
                toast.error("Failed to update profile details");
            }
        }
    };

    export function changePassword(data,token){
        return async(dispatch) =>{
            const toastId = toast.loading("Changing password...");

            try{
                const response=await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword:data.currentPassword,password:data.newPassword},{
                    Authorization:`Bearer ${token}`
                });
                console.log(response);
                if(!response.data.success){
                    toast.dismiss(toastId);
                    toast.error("Failed to change the password")
                    throw new Error("faild to change the password");
                }
                toast.dismiss(toastId);
                toast.success("Password Changed successfully");
            } catch(error){
                console.log("Error in the change password api :",error);
                toast.dismiss(toastId);
                toast.error("Failed to chnage the password");
            }
        }
    };

    export function deleteAccount(token,navigate){
        return async(dispatch)=>{
                const toastId = toast.loading("Deleting your account...");
            try{
                const response=await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,null,{
                    Authorization:`Bearer ${token}`
                });
                console.log("DELET account response ",response);
                if(!response.data.success){
                    throw new Error("Failed to delete the profile");
                }
                dispatch(logOut(navigate));
                toast.dismiss(toastId);
                toast.success("Account deleted successfully");
                
            } catch(error){
                toast.dismiss(toastId);
                toast.error("Failed to delete the Account");
                console.log(error);
            }
        }
    };

    export async function getAllEnrolledCourses(token,dispatch){
        
        let result=[];
        try{
            
            const response = await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{
                Authorization:`Bearer ${token}`
            });
            // console.log("result :",result);

            if(!response.data.success){
                throw new Error("Failed to get the enrolled courses");
            }
            result=response.data.data;

        } catch(error){
            console.log("ERROR in fetching the enrolled courses :",error);
        }
        return result;
    }