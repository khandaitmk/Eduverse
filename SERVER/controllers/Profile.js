// const { Profiler } = require("react");
const Profile =require("../models/Profile");
require("../models/CourseProgress");
require("../models/Profile");
const User=require("../models/User");
const {uploadfile} =require("../util/imageUploader")


exports.updateProfile=async (req,res)=>{
    try{
        // get data 
        const {gender,dateOfBirth="",about="",contact}=req.body;
        // get user id
        const userId=req.user.id;
        // validate the data
        if(!gender || !dateOfBirth || !about || !contact || !userId){
            return res.status(400).json({
                success:false,
                message:"fill all the fields"
            });
        }
//          find profil details
        const userDeatils= await User.findById(userId).populate("additionalDetails").exec();
        const profileId=userDeatils.additionalDetails;
        console.log("additional details : ",profileId);

        const profileDetails=await Profile.findById(profileId);
        // update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contact=contact;
        profileDetails.gender=gender;
        await profileDetails.save();        //this will save the profileDetails in the DB
        // return response
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails
        });
        
    } catch(error){
        console.log("Error :",error);
        return res.status(400).json({
            success:false,
            message:"Failed to update the profile"
        });
    }
};

// todo---find chron job and  how can i schedule the delete task after 5 dya after deletion startaed
exports.deletAccount=async (req,res)=>{
    try{
        // fetch the id 
        const Id=req.user.id;

        // validate the data
        const userDetails= await User.findById(Id)
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:error.message

            });

        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.Profile});


        // TODO:unenroll user from all enrollled courses
        userDetails.courses=[];
        await userDetails.save();
        // check this is correct or not it may give errors in the operations




        // delete user
        await User.findByIdAndDelete({_id:Id});
        // return response
        return res.status(200).json({
            success:true,
            message:"account deletes successfully"
        });
        
    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

exports.getAllUserDetails=async (req,res) =>{
    try{
                //get id
                const id=req.user.id;

                // validate and get the user details
                console.log(id);
                const userDetails=await User.findById(id).populate("Profile").exec();
                console.log("user :",userDetails);
                // return response 
                return res.status(200).json({
                    success:true,
                    message:"user data fetched successfully",
                    userDetails
                })

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:"Failed to fecth the User data"
        })
    }
};

// get enrolled courses
exports.getAllEnrolledCourses = async(req,res) =>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        const isUser = await User.findById(userId).populate({
            path:"courses",
            populate :{
                path:"courseContent"
            }
        })
        .populate("courseProgress")
        .exec();
        if(!isUser){
            return res.status(400).json({
                success:false,
                message:" User not founded"
            });
        }

        console.log(isUser);
        // const courses = isUser?.courses;
        // console.log(courses);

        return res.status(200).json({
            success:true,
            message:"enrolled courses fetched successfully",
            data:isUser
        });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
// update profile image
exports.changeProfileImage = async(req,res) =>{
    try{
        const id=req.user.id;
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const {image}=req.files;
        if(!image){
            return res.status(400).json({
                success:false,
                message:"please fill image to change the profile"
            });
        }
        const uploadDetails=await uploadfile(image, process.env.FOLDER_NAME);
        const imageUpload =await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{new:true});
        
        return res.status(200).json({
            success:true,
            message:"profile changed successfully",
            user:imageUpload
        })
    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
