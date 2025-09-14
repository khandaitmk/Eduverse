import React from 'react'
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './Course Information/CourseInformationForm';
import CourseBuilderForm from './Course Builder/CourseBuilderForm';
import PublishCourse from './Publish Course/PublishCourse';

function RenderSteps() {
    const {step} =useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title:"Course Information" 
        },
        {
            id:2,
            title:"Course Builder" 
        },
        {
            id:3,
            title:"Publish" 
        }
    ]
  return (
    <div className=' w-full flex flex-col justify-center items-center gap-3 text-richblack-500'>
        {/* steps numbers with title */}
        {/* 9557 */}

        <div className=' flex w-full justify-center'>
            {
                steps.map((item) => {
                    return (
                        <div key={item.id} className=' flex flex-col justify-center items-center gap-3 w-full'>
                            <div className='flex w-full items-center'>
                                {
                                    item.id > 1 ? <div className=' h-1 border-t-2 border-dashed border-richblack-800 w-full'></div> :
                                    <div className='w-full'></div>
                                }
                                <div className={`bg-richblack-800 rounded-full w-20 h-10 flex items-center text-richblack-200
                                     justify-center p-1 border-2 ${ step === item.id ?" border-yellow-50 bg-yellow-900":""}`}>
                                    {
                                        (step>item.id)?<FaCheck></FaCheck>:<p className='text-lg'>{item.id}</p>
                                    }
                                </div>
                                {
                                    item.id < 3 ? <div className={`h-1 border-t-2 border-dashed border-richblack-800 w-full `}></div> :
                                    <div className='w-full'></div>
                                }
                            </div>
                            <div className={`${ step === item.id ?" text-white":""}`}>
                                {item.title} 
                            </div>
                        </div>
                    );
                })
            }
        </div>
        {/* pages related to steps */}
        <div className=' bg-richblack-800 rounded-md p-5'>
            {step === 1 && <CourseInformationForm />}
            { step === 2 && <CourseBuilderForm />}
            { step === 3 && <PublishCourse />}
        </div>
    </div>
  )
}

export default RenderSteps