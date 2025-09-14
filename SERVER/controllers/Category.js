const { all } = require("axios");
const Category=require("../models/Category");

//  create the Tag now replaced as the category

exports.createCategory= async (req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"please fill all the fields"
            });
        }
        const categoryDetails=await Category.create({name:name,description:description});
        return res.status(200).json({
            success:true,
            message:"tags created successfully"
        });

    }
    catch(error){
        console.log("Error: ",error);
        return res.status(400).json({
            success:false,
            message:"Failed to create the tag"
        });
    };
};

// get all tags now replaced as the categories

exports.showAllCategories=async (req,res) =>{
    try{
        const allCategories=await Category.find({},{name:true,description:true});
        if(!allCategories){
        return res.status(400).json({
            success:false,
            message:"categories not founded so create it first"
        }) ;
        }
        res.status(200).json({
            success:true,
            message:"all categories fetched successfully",
            data:allCategories
        });
    } catch(error){
        console.log("Error :",error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
};

exports.categoryPageDetails=async (req,res) => {
    try{
        const {categoryId}=req.body;
        //  find the course for the specified course id
        const selectedCategory= await Category.findById(categoryId).    populate("course").exec();
        console.log(selectedCategory);
        //  now handle the case when category is not found
        if(!selectedCategory){
            console.log("category not founded");
            return res.status(400).json({
                success:false,
                message:"category not founded"
            });
        }

        // handle the case when no course founded for the selected category

        if(selectedCategory.course.length ==0){
            console.log("no course founded for thr selected category");
            return res.status(400).json({
                success:false,
                message:"no course founded for the selected category"
            });
        }
        
        const selectedCourses=selectedCategory.course;

        // get course for the other categories

        const categoriesExceptSelected=await Category.find({_id:{$ne:categoryID}}).populate("course");
        const differentCourses =[];
        for (const category of categoriesExceptSelected){
            differentCourses.push(...category.course);
        }

        // get top selling courses across all class 5 35:57
        const topSellingCourses = differentCourses
        .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
        .slice(0, 3);
        
        // return response with all the details
        return res.status(200).json({
            success:true,
            message:"category page details fetched successfully",
            data:{
                selectedCategory,
                selectedCourses,
                differentCourses,
                topSellingCourses
            }

        });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to fetch the category page details"
        });
    }
};