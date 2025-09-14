const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
        enum:['Male',"Female","Other"],
    },
    dateOfBirth:{
        type:String,

    },
    about:{
        type:String,
    },
    contact:{
        type:Number,
    }
});

module.exports=mongoose.model("Profile",profileSchema);