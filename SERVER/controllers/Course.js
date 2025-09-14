const Course=require('../models/Course');
const Tag=require('../models/Category'); 
const User=require('../models/User');
const {uploadFile}=require('../util/imageUploader');

exports.createCourse= async (req,res) =>{
    try{
        // fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag} =req.body;

        // validation for the dataaa
        const thumbnail=req.files.thumbnailImage;
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"please fill all the fields"
            });
        }
        //  check for the instructor
        const userID=req.user.id;
        const instructorDetails =await User.findById(userID);
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found"
            });
        }

        // verify this user is instructor or not
        if(instructorDetails.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This route is protected for instructor only"   
            });
        }
        // check for the tag
        const tagDetails =await Tag.findById({tag});
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"tag is invalid"
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadFile(thumbnail,"courseThumbnails");
        if(!thumbnailImage){
            return res.status(400).json({
                success:false,
                message:"Failed to upload thumbnail image"
            });
        }

        // creating an entry for the new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnailImage:thumbnailImage.secure_url,

        });

        // update the course for the instructor
        await User.findByIdAndUpdate({_id:userID},{$push:{courses:newCourse._id}},{new:true});
        // update the tag

        await Tag.findByIdAndUpdate({_id:tagDetails._id},{$push:{course:newCourse._id}},{new:true});

        return res.status.json({
            success:true,
            message:"course created successfully",
            newCourse
        });

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Failed to create the course"
        });
    }
};
exports.getAllCourses= async (req,res) =>{
    try{
        // get all courses for the Courses model in the course array
         const allCourses=await Course.find({},{courseName:true,price:true,thumbnailImage:true,instructor:true,tag:true,ratingAndReviwes:true,studentsEnrolled:true})
         .populate("Instructor").exec();
         return res.status(200).json({
             success:true,
             message:"data for all courses fetched successfully",
             allCourses
         });
    }
    catch(error){
        console.log("Error :",error);
        return res.status(400).json({
            success:false,
            message:"Failed to fetch the courses"
        });
    }
};

// get course details

exports.getCourseDetails= async (req,res) =>{
    try{
        // fetch course id
        const {courseId}=req.body;
        
        // find out course details
        const courseDetails=await Course.find({_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("rartingAndReview")
                                    .populate(
                                        {
                                            path:"courseContenet",
                                            populate:{
                                                path:"subSection"
                                            }

                                        }
                                    )
                                    .exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"could not find the course"
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"course details fetched successfully",
            data:courseDetails
        });
    } catch(error){
        console.log("error:",error);
        return res.status(400).json({
            success:false,
            message:"failed to fetch all the course details"
        });
    }
}