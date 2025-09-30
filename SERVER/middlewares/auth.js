const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

exports.auth= async (req,res,next) =>{
    try{
        // extract token
        console.log("cookies:", req.cookies);
        console.log("body:", req.body);
        console.log("headers:", req.headers);

        const token=req.cookies?.token || req.body?.token || req?.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing",
            });
        };
        // verify the token
        try{
                    const decode= jwt.verify(token,process.env.JWT_SECRET);
                    console.log(decode);
                    req.user=decode;

        } catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid token"+error,
            });
        }
        next();

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:error.message
        });
    };
};

exports.isStudent=async (req,res,next)=>{
    try{
        const {accountType,email,id}=req.user;
        
        if(accountType !== "Student"){
            return res.status(403).json({
                success:false,
                message:"this is a protected route for students only"
            });
        };
        next();

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:"failde to verify the secured route",
            error:error.message
        })
    }
};

exports.isInstructor=async (req,res,next)=>{
    try{
        const {accountType,email,id}=req.user;
        console.log("account Type=",accountType);
        if(accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"this is protected route for Instructor only"
            });
        };
        next();

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:error.message
        });
    };
};

exports.isAdmin=async (req,res,next)=>{
    try{
        const {accountType}=req.user;
        console.log("req user :",req.user);
        console.log("accountType :",accountType);
        if(accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"this is protected rout for Admin only"
            });
        };
        next();

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:"failed to verify the secured route"
        });
    };
};