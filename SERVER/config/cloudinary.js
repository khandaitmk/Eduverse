const cloudinary=require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect= () =>{
    try{
        cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_APIKEY,
        api_secret:process.env.CLOUD_SECRET
});
console.log("cloudinary connected");
    } catch(error){
        console.error("Error connecting to Cloudinary:", error.message);
        console.log("ERROR")
    }
};