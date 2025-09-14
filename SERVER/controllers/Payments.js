const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../util/mailSender");

// capture the payment and initiate the RazorPay order
exports.capturePayment = async (req,res) =>{
    try{
        // get courseId and UserId
        const {courseId}=req.body;
        const userId=req.user.id;
        // validation
        if(!courseId || !userId){
            return res.status(400).json({
                success:false,
                message:"provide the sufficient information"
            });
        }
        // validate courseid
        const courseDetails=await Course.findById(courseId);
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"course details not funded"
            });
        }
        //  validate userid

        // check if user already paid for the course
        const uid=new mongoose.Types.ObjectId(userId); // need this conversion because  we used for the includes function that check also type  our userId is in String and studentsEnrolled is objectID thas why

        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"you already paid for this course"
            });
        }
        // create order

        const amount=courseDetails.price;
        const currency="INR";
         const options={
            amount:amount*100,
            currency:currency,
            receipt:`receipt${courseId} ${userId}`,
            notes:{
                courseId:courseId,
                userId

            }
         };
         try{
            // initiate the paymeny using RP
            const paymentResponse=await instance.orders.create( );
            console.log(paymentResponse);


         } catch(err){
            console.log("error: ".error)
            return res.status(400).json({
                success:false,
                courseName:courseDetails.courseName,
                courseDescription:courseDetails.courseDescription,
                thumbnail:courseDetails.thumbnail,
                orderId:paymentResponse.id,amount:paymentResponse.amount,
                message:"faild to order the payment"
            })
         }
        // return response
        return res.status(200).json({
            success:true,
            message:"order for the payment successfull"
        });

    } catch(error){
        console.log("Error :",error)
        return res.status(400).json({
            success:false,
            message:"Failed to capture the payment"
        });
    }
};


// verify signature

exports.verifySignature=async (req,res) =>{
    try{
       const webhookSecret="12345678";// this is the secret key that we set in the razorpay dashboard

    //    this is to be searched what happened
       const signature=req.headers["x-razorpay-signature"];
       const shasum=crypto.createHmac("sha256",webhookSecret);
       shasum.update(JSON.stringify(req.body));
       const digest=shasum.digest("hex");   
         if(signature === digest){
            console.log("payment is authorised");
            // now user ko course me add krna hai
            const {courseId,userId}=req.body.payload.entity.notes;

            try{
                const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});

                if(!enrolledCourse){
                    return res.status(400).json({
                        success:false,
                        message:"course not found"
                    });
                }
                console.log(enrolledCourse);
                // find the user and add course in the course section 
                const enrolledStudent=await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
                console.log(enrolledStudent);
                

//                 now send the mail of success

                const emailResponse=await mailSender(enrolledStudent.email,"You are successfully enrolled to the Course",`You are successfully registered for the course ${enrolledCourse.courseName} now you can start your learning`);
                console.log(emailResponse);

                return res.status(200).json({
                    success:true,
                    message:"Signature verified and course added successfully"
                });


            }catch(err){
                return res.status(400).json({
                    success:false,
                    message:"failed to veify the signature"
                });
            }
            
         }else{
            return res.status(400).json({
                success:false,
                message:error.message
            });
         }


    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}