const express=require("express");
const Router=express.Router();
// import controllers
const {createCourse, getAllCourses, getCourseDetails,editCourse,getAllInstructorCourses} = require('../controllers/Course');
const {createCategory, showAllCategories,categoryPageDetails} = require('../controllers/Category');
const {createSection, updateSection, deleteSection} = require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/SubSection');
const {createRatingAndReview, averageRating,getAllRating} = require('../controllers/RatingAndReview');
const {auth,isStudent,isInstructor,isAdmin} = require("../middlewares/auth");
// console.log(auth, isStudent, isInstructor, isAdmin);

// course can only be created as instructor
Router.post('/createCourse', auth, isInstructor, createCourse);
Router.post('/editCourse', auth, isInstructor, editCourse);

Router.post("/addSection",auth, isInstructor, createSection);
Router.post("/updateSection",auth, isInstructor, updateSection);
Router.post("/deleteSection",auth, isInstructor, deleteSection);
Router.post("/addSubSection",auth, isInstructor, createSubSection);
Router.post("/updateSubSection",auth, isInstructor, updateSubSection);  
Router.post("/deleteSubSection",auth, isInstructor, deleteSubSection);
Router.get('/getAllCourses', getAllCourses);
Router.get('/getCourseDetails/:courseId', getCourseDetails);
Router.get("/getInstructorCourses", auth,isInstructor, getAllInstructorCourses);


// Category
Router.post("/createCategory", auth, isAdmin, createCategory);
Router.get("/showAllCategories", showAllCategories);
Router.post("/categoryPageDetails",categoryPageDetails);

// Rating and review

Router.post("/createRating",auth, isStudent, createRatingAndReview);
Router.get("/getAverageRating", averageRating);
Router.get("/getAllRating", getAllRating);

module.exports = Router;