const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const courseRoutes=require("./routes/Course");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payment");

require("dotenv").config();

const {connectDB}=require("./config/database");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload =require("express-fileupload");

const PORT =process.env.PORT || 4000;

// connect with db
connectDB();

// use middlewares
app.use(express.json());
app.use(cookieParser());    
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

// connect with cloudinary
cloudinaryConnect();

// use routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);


app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to the EdTech API"
    });
});

// start the server

app.listen(PORT,()=>{
    console.log(`Server is runnig at ${PORT}`);
});