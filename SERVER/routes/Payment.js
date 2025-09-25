const express=require("express");
const Router=express.Router();
const {capturePayment,verifySignature}=require("../controllers/Payments");
const {auth,isStudent}=require("../middlewares/auth");
const {createCheckoutSession,stripeWebhook} = require("../config/stripe");

Router.post("/capturePayment",auth,isStudent,capturePayment);
Router.post("/verifyPayment",verifySignature);
Router.post("/pay",auth,isStudent,createCheckoutSession);
Router.post("/webhook",stripeWebhook)

module.exports=Router;