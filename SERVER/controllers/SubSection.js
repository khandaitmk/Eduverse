const Section =require("../models/Section");
const SubSection=require("../models/SubSection");
const {uploadFile} = require("../util/imageUploader");
const Course=require("../models/Course");
require("dotenv").config();
exports.createSubSection=async (req,res) =>{
    try{
        // fetch data
        const {title,timeDuration,description,sectionId}=req.body;

        // extract video
        const videoFile=req.files.videoFile;
        // validate data
        if(!title || !timeDuration || !description || !sectionId || !videoFile){
            return res.status(400).json({
                success:false,
                message:"fill all the fields"
            });
        }
        // upload video to cloudinary the store the secure url
        const uploadDetails=await uploadFile(videoFile,process.env.FOLDER_NAME);
        // create sub section
        const subSectionDetails=await SubSection.create({title:title,timeDuration:timeDuration,description:description,videoUrl:uploadDetails.secure_url});
        // update section with subsection id
        const updateSectionDetail=await Section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionDetails._id}},{new:true});
// populated sub section in the section so the sub sectio details will be shown not the section id 
        populatedSubSection=await Section.findById(updateSectionDetail._id).populate("subSection").exec();
        const updatedCourse = await Course.findOne({courseContent:sectionId}).populate({path:"courseContent",
            populate:{path:"subSection",model:"SubSection"}}
        ).exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"subsection created and added to the section successfully",
            updatedCourse
        })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

exports.updateSubSection=async (req,res) =>{
    try{
        // fetch the data
        const {title,timeDuration,description,subSectionId}=req.body;
        const videoFile=req.files.videoFile;

        // validate the data
        if(!title || !timeDuration ||!description || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"please fill all the fields"
            });
        }
        // check for the subsection existance
        if(!await SubSection.findById(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"sub section not founded"
            });
        }
        // upload the new video to cloudinary
        const updatedVideoDetail= await uploadFile(video,process.env.FOLDER_NAME);
        // update the data
        const updatedDetails=await SubSection.findByIdAndUpdate(subSectionId,{title:title,timeDuration:timeDuration,description:description,videoUrl:updatedVideoDetail.secure_url,},{new:true})
        // return response
        return res.status(200).json({
            success:true,
            message:"sub section updated successfully"
        });

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"failed to update the sub-section"
        });
    }
};

exports.deleteSubSection=async (req,res) =>{
    try{
        // get id Assuming that we are sending the id in params
        const subSectionId=req.params.subSectionId ||req.body.subSectionId;
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"please fill all the details that is sub-section id"
            });
        }
        // use findById and delete and delete the sub section
        const deletedSubSection= await SubSection.findByIdAndDelete(subSectionId);
        // does we need to delete the sub-section id from the subSection section array in Section 
        const updatedSection = await Section.findOneAndUpdate(
            {subSection:subSectionId},
            {$pull:{subSection:subSectionId}},
            {new:true}
        );
        const updatedCourse = await Course.findOne({courseContent:updatedSection._id}).populate({path:"courseContent",
            populate:{path:"subSection"}}
        ).exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"the sub-section  deleted successfully",
            updatedCourse
        })
    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Failed to delete the sub-section ",
            error:error.message
        });
    }
};