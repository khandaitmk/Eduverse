const cloudinary=require("cloudinary").v2;
exports.uploadfile = async (file,folder,q) =>{
        try{
            const option={
                folder:folder,
                resource_type:"auto",
                quality:q
            }
            const result = await cloudinary.uploader.upload(file.tempFilePath,option);
            return result;
        } catch(error){
            console.error(error);
            throw error;
        }
    }
