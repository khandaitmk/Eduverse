const mongoose = require("mongoose");

const contactUs = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model("ContactUs", contactUs);