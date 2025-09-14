const express=require("express");
const Router=express.Router();
const {capturePayment,verifySignature}=require("../controllers/Payments");
const {auth,isStudent}=require("../middlewares/auth");

Router.post("/capturePayment",auth,isStudent,capturePayment);
Router.post("/verifyPayment",verifySignature);
module.exports=Router;