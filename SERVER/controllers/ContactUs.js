const ContactUs = require('../models/ContactUs');

exports.contactUs = async(req,res) =>{
    try{
        const {firstName,lastName,email,phoneNo,message}=req.body;

        if(!firstName || !lastName || !email || !phoneNo || !message){
            return res.status(400).json({
                success:false,
                message:"PLease enter all required details"
            })
        }
        const contactUs = await ContactUs.create({firstName:firstName,lastName:lastName,email:email,phoneNo:phoneNo,message:message});
        
        return res.status(200).json({
            success:true,
            message:"Form submited Successfully",
            data:contactUs
        });

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in the Contact us",
            error:error.message
        });
    }
}