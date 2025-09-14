const mongoose=require('mongoose');
const {mailSender}=require('../util/mailSender');
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:'5m'
    }

});
//  a function to send the otp
const sendVerificationEmail= async (email,otp) =>{
    try{
        // const {mailSender}=require('../util/mailSender');
        const mailResponse=await mailSender(email, "OTP Verification", 
            `<div style="font-family: Arial, sans-serif; line-height:1.6; color: #333;">
      <h2>Welcome to EdTech Platform!</h2>
      <p>Hi Dear,</p>
      <p>We received a request to create an account using this email address.</p>
      <p><strong>Your OTP is:</strong></p>
      <h1 style="color: #4CAF50; letter-spacing: 4px;">${otp}</h1>
      <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <br/>
      <p>If you did not request this, you can safely ignore this email.</p>
      <br/>
      <p>Best regards,<br/>Team Manish.</p>
    </div>`
        );
        console.log("Email sent successfully: ", mailResponse);
    }
    catch(error){
        console.log("Error sending email: ", error.message);
    }
};

otpSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports=mongoose.model("Otp",otpSchema);