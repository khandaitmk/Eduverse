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
                    const decode=await jwt.verify(token,process.env.JWT_SECRET);
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
        const {accoutType,email,id}=req.user;
        
        if(accoutType !== "Student"){
            return res.status.json({
                success:false,
                message:"this is protected rout for student only"
            });
        };
        next();

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:"failde to verify the secured route"
        })
    }
};

exports.isInstructor=async (req,res,next)=>{
    try{
        const {accoutType,email,id}=req.user;
        
        if(accoutType !== "Instructor"){
            return res.status.json({
                success:false,
                message:"this is protected rout for Instructor only"
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