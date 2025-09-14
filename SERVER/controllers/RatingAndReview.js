const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const User=require("../models/User");

// function name is only rating but it is also for the reviews only for write fast ........***

// Create rating
exports.createRatingAndReview= async (req,res) =>{
    try{
        const {courseId,rating,review}=req.body;
        const userId=req.user.id;
        // check if user is enrolled or not
        const courseDetails=await Course.findOne({_id:courseId});
        const isIncludes=courseDetails.studentsEnrolled.some(
            id => id.equals(userId)//here id is the element of the array studentEnrolled
        );
        if(!isIncludes){
            return res.status(400).json({
                success:false,
                message:'student is not enrolled in this course'
            });
        }
        // check if that user already reviewed or not
        const isRated=courseDetails.ratingAndReviwes.some(
            id => id.equals(userId)//here id is the element of the array studentEnrolled
        );
        if(isRated){
            return res.status.json({
                success:false,
                message:"student already enrolled and now you are not allowed to RAR"
            });
        }
        // create rating
        const newRating= await RatingAndReview.create({user:userId,rating:rating,review:review,course:courseId});
        // update course with rating review
        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReviwes:newRating._id}},{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"ratin and review is successfull",
            data:newRating
        });


    } catch(error){
        console.log("ERror :",error);
        return res.status(500).json({
            success:false,
            messag:"failed to submit the rating and reviwe "
        });
    }
};
// get average rating
exports.averageRating =async (req,res) =>{
    try{
        const courseId=req.body.courseId;
        // calculate course rating

        // here we used agregate because it allows us to perform step by step operations on the data that is first matches all courses and then  group all the ratings and then calculate the average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg :"$rating"},
                }
            }
        ]);
        // if rating exists then 
        //   [{ _id: null, averageRating: 4.5 }] this is the array returned by the result then we hab=ve only rating so result[0].averageRating (it is the key averagerating ) will give us the average rating

        if(result.length >0){
            return res.status(200).json({
            success:true,
            message:"average rating fetched successfully",
            averageRating:result[0].averageRating
        });
        }
        // if no rating exists then
        return res.status(200).json({
            success:true,
            message:"no rating exists for this course",
            averageRating:0
        });
        

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"failed to calculate the average of the ratings"
        });
    }
};
// get all rating

exports.getAllRating= async (req,res) =>{
    try{
        const allReviews=await RatingAndReview.find({}).sort({rating:-1})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName"
                                    })
                                    .exec();
       return res.status(200).json({
        success:true,
        message:"all rating reviews are fetched successfully"
       });

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"failed to fetch all the ratings"
        });
    }
}