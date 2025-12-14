const User=require("../models/User");
const Otp=require("../models/Otp");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile = require("../models/Profile");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const {mailSender}=require("../util/mailSender");

exports.sendOtp= async (req,res)=>{
try{
    const {email}=req.body;
    const checkUserPresent= await User.findOne({email});
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"the email alredy exists"
        });
    };
    // generate otp
    var otp= otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
    console.log("generated otp :",otp);
    // check otp is unique or not

    let existingOtp = await Otp.findOne({otp});
    while(existingOtp){
        otp= otpGenerator.generate(6,alphabet=false,upperCase=false,specialChars=false);
        existingOtp = await Otp.findOne({otp}); 
    }

    const otpPayload={email,otp};

    // create an entry in db
    const otpBody=await Otp.create(otpPayload);
    console.log("otpBody :",otpBody);

    //  before this save otp will sent
    return res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        data:otpBody
    })


} catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:"Error sending OTP",
        
    });
}
};

exports.signUp=async (req,res) => {
    try{

        const {firstName,lastName,email,contact,password,confirmPassword,otp,accountType}=req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            });
        };

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password doesn't match"
            });
        };

        const isExist=await User.findOne({email});
        if(isExist){
            return res.status(400).json({
                success:false,
                message:"User already exists/registered"
            });
        };

        // finding most recent otp
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:error.message
            });
        } else if(recentOtp[0].otp !== otp){
            // invalid otp
            return res.status(400).json({
                success:false,
                message:"Invalid Otp entered"
            })

        }
        const hashedPassword=await bcrypt.hash(password,10);
        const profileDetails=await Profile.create({gender:null,dateOfBirth:null,about:null,contact:null})
        const userEntry= await User.create({firstName,lastName,email,contact,password:hashedPassword,accountType,additionalDetails:profileDetails._id, image:`https://api.dicebear.com/8.x/initials/svg?seed=${firstName}+${lastName}`});  
        const populatedUser = await User.findById(userEntry._id)
                                                                .populate("additionalDetails")
                                                                .exec();

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:populatedUser
        });
    } catch(error){
        console.log("error in the sign up ",error);
        return res.status(400).json({
            success:false,
            message:error.message
        });
}
};

exports.login=async (req,res) => {
try{
    //get data
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"Please fill the all fields"
        });
    };

    const user=await User.findOne({email}).populate("additionalDetails").exec();
    if(!user){
        return res.status(400).json({
            success:false,
            message:"The email is not registered"
        });
    };
    // check password
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            success:false,
            message:"Incorrect password"
        });
    }
    
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType

        }
        const token =await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
        user.password=undefined;
    

    // create the cookie
    const option={
        expires:new Date(Date.now()+3*24*60*60*1000),
        secure:true,
        httpOnly:true
    }
    res.cookie("token",token,option).json({
        success:true,
        token,
        user,
        message:"loged in successfully"
    })



} catch(error){
    console.log("error :",error);
    return res.status(400).json({
        success:false,
        message:"error in the login",
        error:error.message
    });
}
};

// change password
exports.changePassword= async (req,res) => {
    try{
        const {oldPassword,password}=req.body;
        if( !oldPassword || !password ){
            return res.status(400).json({
                success:false,
                message:"please all the fields"
            });
        };
        const user= req.user.id;
        
        const isUser=await User.findById({_id:user});
        if(!isUser){
            return res.status(400).json({
                success:false,
                message:"User NOt founded"
            });
        };
        // if(password !== confirmPassword){
        //     return res.status(400).json({
        //         success:false,
        //         message:"passords are not matched"
        //     });
        // };

        const isPasswordCorrect=await bcrypt.compare(oldPassword,isUser.password);
        if(!isPasswordCorrect){
            await mailSender(
  isUser.email,
  "Suspicious Password Change Attempt Detected",
  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #fff8f8;">
    <h2 style="color: #d32f2f;">⚠️ Suspicious Activity Detected</h2>
    <p>Hello <b>${isUser.firstName || "User"}</b>,</p>
    
    <p>We noticed a <b>failed attempt</b> to change your account password.</p>
    <p>If this was you and you entered the wrong password, no worries — your account is still secure.</p>
    
    <p style="color: #d32f2f;"><b>If this was not you, someone may be trying to access your account.</b></p>
    
    <p>We also recommend enabling <b>two-factor authentication (2FA)</b> if you haven’t already, to add extra security to your account.</p>
    
    <p>Stay safe,</p>
    <p><b>YourApp Security Team</b></p>
    
    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e0e0e0;" />
    <p style="font-size: 12px; color: #666;">If you didn’t try to change your password, please reset it immediately and contact our support team.</p>
  </div>
  `
);

            return res.status(400).json({
                success:false,
                message:"Please provide the valid password"
            });
        }
         const hashedNewPassword= await bcrypt.hash(password,10);
         isUser.password=hashedNewPassword;
         await isUser.save();
         await mailSender(isUser.email,"Password changed sucessfully",`
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
    <h2 style="color: #4CAF50;">Password Changed Successfully</h2>
    <p>Hello <b>${isUser.firstName || "User"}</b>,</p>
    <p>We wanted to let you know that your account password was changed successfully.</p>
    
    <p>If this was you, no further action is required.</p>
    <p style="color: #d32f2f;"><b>If you did not make this change, please reset your password immediately and contact our support team.</b></p>
    

    
    <p>Stay secure,</p>
    <p><b>YourApp Support Team</b></p>
    
    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e0e0e0;" />
    <p style="font-size: 12px; color: #666;">If you didn’t request this change and can’t access your account, please reach out to our support team immediately.</p>
  </div>
  `);
         return res.status(200).json({
            success:true,
            message:"the password change successfully"
         })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"failed to change the password"
        })
    }
};