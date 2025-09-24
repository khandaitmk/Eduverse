const Stripe=require("stripe");
const User = require("../models/User");
const Course = require("../models/Course");
require("dotenv").config();
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async(req,res)=>{
    try{

        const {courses,userEmail}=req.body;
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