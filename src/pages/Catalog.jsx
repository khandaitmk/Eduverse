import React, { useEffect } from 'react'
import { getCatalogPageDetails } from '../services/operations/pageAndComponentDetails'
import { useParams } from 'react-router-dom';
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/core/Homepage/Footer';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { CgUnavailable } from "react-icons/cg";
import { setLoading } from '../slices/authSlice';

function Catalog() {
  const {catalogName}=useParams();
  const [categoryId,setCategoryId]=useState(null);
  const [desc,setDesc]=useState("");
  const [catalogPageData,setCatalogPageData]=useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchSubLinks = async()=>{
    try{
      const result = await fetchCourseCategories();
      // console.log("Printing the result :",result);
      const categoryId = result.find((category) => category.name === catalogName)?._id;
      console.log("categoryId :",categoryId);
      setCategoryId(categoryId);
      setDesc(result.find((category) => category.name === catalogName)?.description);
    } catch(error){
        console.log("Error in fetching the catalog page details",error);
    }
  };

  useEffect(()=>{
    fetchSubLinks();
  },[catalogName]);

  useEffect(()=>{
        

    const fetchCatalogDetails = async() =>{
      dispatch(setLoading(true));
      if(!categoryId){
        return;
      }
      const result = await getCatalogPageDetails(categoryId, token);
        // toast.dismiss(toastId);

      console.log("result of catalog details :",result);
      setCatalogPageData(result);
      dispatch(setLoading(false));

    };

    fetchCatalogDetails();
  },[categoryId]);


  return (
    <div className='text-white'>
      <div className=' mx-auto'>
        {/* section 1 */}
          <div className=' bg-richblack-800'>
            <div className='w-11/12 mx-auto flex flex-col gap-5 p-20 text-richblack-400 '>
              <p className=' text-sm'>Home / catalog / <span className='text-yellow-50'>{catalogName}</span></p>
              <h1 className=' text-3xl text-white'>{catalogName}</h1>
              <p>{desc}</p>
            </div>
          </div>
          {/* section-2 */}
          <div>
              {
                catalogPageData ? (
                  <div>
                    <div className='w-11/12 mx-auto mt-15 flex flex-col gap-10'>
            <h1 className='text-3xl font-semibold text-center'>Courese to get you started</h1>
            <div>
              {/* all selected courses means all courses of this category */}
              {
                catalogPageData?.selectedCourses?.length
                  ? <CourseSlider courses={catalogPageData.selectedCourses} title={"Courses"}></CourseSlider>
                  : <div className='h-[300px] flex items-center justify-center text-lg'>No courses found for this category</div>
              }
            </div>
                    </div>

                    <div className='w-11/12 mx-auto mt-15 flex flex-col gap-10'>
                      <h1 className='text-3xl font-semibold text-center'>Most Popular Courses</h1>
                      <div>
                        {/*  */}
                        {
                          catalogPageData?.topSellingCourses?.length
                            ? <CourseSlider courses={catalogPageData.topSellingCourses} title={"Courses"}></CourseSlider>
                            : <div className='h-[300px] flex items-center justify-center text-lg'>No courses found for this category</div>
                        }
                      </div>
                    </div>

                  <div className='w-11/12 mx-auto mt-15 flex flex-col gap-10 mb-20'>
                    <h1 className='text-3xl font-semibold text-center'>Similar Courses</h1>
                    <div>
                      {/*  */}
                      {
                        catalogPageData?.differentCourses?.length
                          ? <CourseSlider courses={catalogPageData.differentCourses} title={"Courses"}></CourseSlider>
                          : <div className='h-[300px] flex items-center justify-center text-lg'>No courses found for this category</div>
                      }
                    </div>
                  </div>
                  </div>

                ) : (<div className=' text-red-500 h-[500px] flex items-center justify-center text-lg  flex-col'>
                  <CgUnavailable className=' animate-pulse' size={100}></CgUnavailable>
                  <span>No courses found for this category</span></div>)
              }
          </div>


      </div>
      <div className=' w-full h-[1px] bg-richblack-600'></div>
      {/* footer */}
      <Footer></Footer>
    </div>
  )
}

export default Catalog