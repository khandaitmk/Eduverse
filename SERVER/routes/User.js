const {sendOtp,signUp,login,changePassword}=require("../controllers/Auth");
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {auth}=require("../middlewares/auth");
const express=require("express");
const Router=express.Router();

Router.post("/login",login);
Router.post("/signup",signUp);
Router.post("/sendotp",sendOtp);
Router.post("/change-password",auth,changePassword);
Router.post("/resetpasswordtoken",resetPasswordToken);
Router.post("/resetpassword",resetPassword);

module.exports=Router;