const express=require("express");
const Router=express.Router();
const {updateProfile,deletAccount,getAllUserDetails,changeProfileImage,getAllEnrolledCourses}=require("../controllers/Profile");
const {auth, isStudent}=require("../middlewares/auth");

Router.put("/updateProfile",auth,updateProfile);
Router.delete("/delete-account",auth,deletAccount);
Router.get("/getalluserdetails",auth,getAllUserDetails);
Router.post("/changeProfileImage",auth,changeProfileImage);
// get enrolled courses
Router.get("/getEnrolledCourses",auth,getAllEnrolledCourses);

module.exports=Router;  