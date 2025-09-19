const Section=require('../models/Section');
const Course=require('../models/Course');

exports.createSection=async (req,res) =>{
    try{
        // fetch data
        const {sectionName,courseId}=req.body;
        // validate data
        console.log("sectionname :",courseId);
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"please fill all the fields"
            });
        }
        // create section
        const sectionDetails=await Section.create({sectionName:sectionName});
        // update course with section id
        const courseDetails=await Course.findOneAndUpdate({_id:courseId},{$push:{courseContent:sectionDetails._id}},{new:true});

        const populatedCourse=await Course.findById(courseDetails._id).populate("courseContent").exec();
        // return response
        return res.status(200).json({
            success:true,
            data:populatedCourse,
            id:sectionDetails._id,
            message:"Section created successfully"
        });


    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in creating the section",
            error:error.message
        });
    }
};

exports.updateSection=async (req,res) => {
    try{
        const {sectionName,sectionId}=req.body;
        // validate the details
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"please fill all the fields"
            });
        }
        // check section is their or not
        if(!await Section.findById(sectionId)){
            return res.status(400).json({
                success:false,
                message:"section not founded"
            });
        }
        // update the section
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
        const updatedCourse = await Course.findOne({courseContent:sectionId}).populate("courseContent").exec();
        // return respons
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            updatedCourse
        });

    } catch(error){
        return res.status(400).json({
                success:false,
                message:"failed to update the section details"
        })
    }
};

exports.deleteSection=async (req,res) =>{
    try{
        // get id Assuming that we are sending the id in params
        const {sectionId}=req.body;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"please fill all the details that is section id"
            });
        }
          const course = await Course.findOne({courseContent:sectionId});

        // use findById and delete and delete
        const deletedSection= await Section.findByIdAndDelete(sectionId);
        // does we need to delete the section id from the course
       await Course.updateMany({_id:course._id},{$pull:{courseContent:sectionId}});
       const updatedCourse = await Course.findById(course._id).populate("courseContent").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"the section  deleted successfully",
            updatedCourse

        })
    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
}