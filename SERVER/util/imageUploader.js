const cloudinary=require("cloudinary").v2;
exports.uploadFile = async (file,folder,q) =>{
        try{
            const option={
                folder:folder,
                resource_type:"auto",
                quality:q,chunk_size: 6000000,
                eager_async: true,
            }
            const result = await cloudinary.uploader.upload_large(file.tempFilePath,option);
            return result;
        } catch(error){
            console.error(error);
            throw error;
        }
    }
