const Stripe=require("stripe");
const User = require("../models/User");
const Course = require("../models/Course");
require("dotenv").config();
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async(req,res)=>{
    try{

        const {courses,userEmail}=req.body;
        const userId = req.user?.id;
        if(!courses || courses.length === 0){
            return res.status(400).json({
                success:false,
                message:"no course provided"
            })
        }
        if(!userEmail){
            return res.status(400).json({
                success:false,
                message:"email is not provided"
            })
        }
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized: user id missing"
            })
        }
            const courseDetails = await Course.find({ _id: { $in: courses } });

        const lineItems = courseDetails.map((course) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: course.courseName,
                },
                unit_amount: Math.round(Number(course.price) * 100),
            },
            quantity: 1,
        }));
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/dashboard/enrolled-courses`,
            cancel_url: `http://localhost:3000/dashboard/enrolled-courses`,
            customer_email: userEmail,
            invoice_creation: { enabled: true },
            metadata: { courses: JSON.stringify(courses), userId } // include userId for reliable enrollment
        });


        return res.status(200).json({ success: true, url: session.url });

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Payment Failed",
            error:error.message
        });

    }
}

exports.stripeWebhook = async (req,res) =>{
    const sig= req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try{
        event = stripe.webhooks.constructEvent(req.body,sig,endpointSecret);
    } catch(error){
        console.error("Webhook signature error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    console.log("Stripe event:", event.type);

    if(event.type === "checkout.session.completed"){
        const session = event.data.object;
        console.log("Session ID:", session.id);
        const customerEmail = session.customer_email || session.customer_details?.email;
        const coursesMeta = session.metadata?.courses;
        const userIdMeta = session.metadata?.userId;

        let courses = [];
        try{
            if(coursesMeta){
                courses = JSON.parse(coursesMeta);
            }
        } catch(parseErr){
            console.error("Invalid courses metadata JSON:", parseErr.message);
        }

        console.log("Will enroll:", { customerEmail, userId: userIdMeta, courses });

        if((userIdMeta || customerEmail) && Array.isArray(courses) && courses.length > 0){
            try{
                const user = userIdMeta
                    ? await User.findById(userIdMeta)
                    : await User.findOne({email:customerEmail});
                if(!user){
                    console.error("User not found for:", userIdMeta || customerEmail);
                }
                if(user){
                    for (const courseId of courses) {
                        await Course.findByIdAndUpdate(courseId, {
                            $addToSet: { studentsEnrolled: user._id },
                        });
                        await User.findByIdAndUpdate(user._id, {
                            $addToSet: { courses: courseId },
                        });
                    }
                    console.log("Enrollment completed for user:", user._id.toString());
                }
            } catch (err) {
                console.error("Error enrolling student:", err.message);
            }
        }
    }

    return res.status(200).send({ received: true });
}