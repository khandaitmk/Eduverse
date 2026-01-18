const cloudinary=require("cloudinary").v2;
exports.uploadFile = async (file,folder,q) =>{
        try{
            const option={
                folder:folder,
                resource_type:"auto",
                quality:q,
                eager_async: true,
            }
            const result = await cloudinary.uploader.upload(file.tempFilePath,option);
            console.log("uploaded data :",result);
            return result;
        } catch(error){
            console.error(error);
            throw error;
        }
    }
