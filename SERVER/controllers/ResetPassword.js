const bcrypt=require("bcrypt");
const User=require("../models/User");
const {mailSender}=require("../util/mailSender");

exports.resetPasswordToken=async (req,res) =>{
    try{
        const email=req.body.email.email;
        
        if(!email){
            return res.status(400).json({
                success:false,
                message:"please fill all fields"
            });
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"please enter valid email"
            });
        }
        const check=await User.findOne({email});
        if(!check){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            });
        }

        const token=crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true});
        // create url
        const url=`http://localhost:3000/update-password/${token}`;
        // now send the mail
        await mailSender(email,"Password reset Link",` password reset link : ${url}`);

        return res.status(200).json({
            success:true,
            message:"the password reset link sent successfully",
            token:token
        });

    } catch(error){
        console.log("Error :",error);
        return res.status(400).json({
            success:false,
            message:error.message
        });
    };
};

exports.resetPassword=async (req,res)=>{
    try{
        // fetch the data
        const {password ,confirmPassword,token}=req.body;
        if(!password || !confirmPassword){
            return res.status(400).json({
                succes:false,
                message:"please fill all the fields"
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                succes:false,
                message:"passwords does not matches"
            });
        }
        const userDetails=await User.findOne({token});
        // is no entry founded then the token is invalid simple
        if(!userDetails){
            return res.status(400).json({
                succes:false,
                message:"token is invalid"
            });
        }
        //  now check token is active or expired on the basis of the expiry time in the db 
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                succes:false,
                message:"token is expired please generate it again to reset the password"
            });
        }

        const hashedPass=await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token},{password:hashedPass,token:undefined,resetPasswordExpires:undefined},{new:true});

        return res.status(200).json({
            success:true,
            message:"the password reset successfully"
        });

    } catch(error){
        console.log("error :",error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}