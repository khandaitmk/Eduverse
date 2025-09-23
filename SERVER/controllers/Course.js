const Course=require('../models/Course');
const Category=require('../models/Category'); 
const User=require('../models/User');
const {uploadFile}=require('../util/imageUploader');

exports.createCourse= async (req,res) =>{
    try{
        // fetch data
        console.log("body contents :",req.body);
        const {courseName,courseDescription,price,category,tag,whatYouWillLearn,instructions} =req.body;
        // console.log("courseName",courseName);
        // validation for the dataaa
        const thumbnail=req.files.thumbnail;
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
        // check for the tag this is categiry not tag....
        const tagDetails =await Category.findOne({name:category});
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"category is invalid"
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
            category:tagDetails._id,
            tag:JSON.parse(tag),
            thumbnail:thumbnailImage.secure_url,
            instructions,
            status:"Draft"
        });

        // update the course for the instructor
        await User.findByIdAndUpdate({_id:userID},{$push:{courses:newCourse._id}},{new:true});
        // update the tag

        await Category.findByIdAndUpdate({_id:tagDetails._id},{$push:{course:newCourse._id}},{new:true});
        const updatedCourse = await Course.findById(newCourse._id).populate([{path:"instructor"},{path:"category"}]).exec();
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            updatedCourse
        });

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
exports.editCourse = async(req,res)=>{
    try{
        // fetch data
         const {courseID} =req.body;
         const course= await Course.findById(courseID);
    	 const updates = req.body
        
         
         if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            });
         }

         for (const key of Object.keys(updates)) { //Object.keys() is method that return the array of keys in the object like {a:1,b:2} => ["a","b"]
        if (key === "tags" || key === "requirements") {
            // Parse JSON fields
            course[key] = JSON.parse(updates[key]);
        } else {
            course[key] = updates[key];
        }
        }

      await course.save()

         if(req.files){
            console.log("Thumbnail file received:", req.files.thumbnail);
            const thumbnail=req.files.thumbnail;
            const thumbnailImage = await uploadFile(thumbnail,"courseThumbnails");
            if(!thumbnailImage){
                return res.status(400).json({
                    success:false,
                    message:"Failed to upload thumbnail image"
                });
            }
            // Update the course with the new thumbnail URL
            console.log("New thumbnail URL:", thumbnailImage.secure_url);
            course.thumbnail = thumbnailImage.secure_url;
            await course.save();
            console.log("Course thumbnail updated successfully");
         }

         const updatedCourse = await Course.findOne({
		_id: courseID,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })

    } catch(error){
        res.status(500).json({
            success:false,
            message:"failed to edit the course details",
            error:error.message
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
        const {courseId}=req.params;
        console.log("course Id:",courseId);
        // find out course details
        const courseDetails=await Course.findById(courseId)
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviwes")
                                    .populate(
                                        {
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection"
                                            }

                                        }
                                    )
                                    .exec();
            console.log("course details :",courseDetails);
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
            courseDetails
        });
    } catch(error){
        console.log("error:",error);
        return res.status(400).json({
            success:false,
            message:"failed to fetch all the course details",
            error:error.message
        });
    }
};

exports.getAllInstructorCourses = async (req,res) =>{
  try{
    // fetch userid
    const userID=req.user.id;
    
    const instructorDetail= User.findById(userID);
    if(!instructorDetail){
        return res.status(400).json({
            success:false,
            message:"instructor not founded"
      });
    }
    // fetch all the courses for the instructor
    const instructorCourses = await Course.find({instructor:userID}).populate({
        path:"courseContent",
        populate:{path:"subSection",
            populate:{path:"timeDuration"}
        }
    }).exec();
    
    return res.status(200).json({
        success:true,
        message:"instructor courses fetched successfully",
        data:instructorCourses
    })
  } catch(error){
    return res.status(500).json({
        success:false,
        message:"error in the fetching the instructor courses",
        error:error.message
    });
  } 
}