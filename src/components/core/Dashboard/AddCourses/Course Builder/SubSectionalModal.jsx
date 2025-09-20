import React from 'react'
import { RxCross2 } from "react-icons/rx";
import Upload from './Upload';
import { useForm } from 'react-hook-form';
import { createSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';

function SubSectionalModal(props) {
    const {modalData,setModalData,add,edit,view}=props;
    const {token} = useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const {register,handleSubmit,getValues,setValue,formState:{errors}}=useForm();
    async function handleSub(data){
        console.log("lect data :",data);
        const result = await createSubSection({title:data.lecTitle,timeDuration:2.30,description:lecDesc,sectionId:modalData,videoFile:data.lecVideo},token,dispatch);

        setModalData(null);
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center h-screen w-screen overflow-auto backdrop-blur-sm z-100'>
        <div className='w-11/12 max-w-[700px] mt-0 overflow-auto rounded-lg border-1 border-richblack-400 bg-richblack-800'>
            <div className='bg-richblack-700 text-white flex justify-between p-4 rounded-lg'>
                    <p className=' text-lg  font-bold'>{edit && "Editing"} {add && "Adding"} {view && "Viewing"} Lecture</p>
                    <button type='button'><RxCross2></RxCross2> </button>
            </div>
            <form action="" method='post' className=' flex flex-col gap-5 text-white w-11/12 mx-auto my-10' onSubmit={handleSubmit(handleSub)}>
               
                <div className=' flex flex-col gap-3'>
                    <label htmlFor="lecTitle" className='text-sm'>Lecture Title<sup className='text-red-500'>*</sup></label>
                    <input id='lecTitle' type="text" placeholder='Enter Lecture Title' className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300' {...register("lecTitle",{required:true})} />
                </div>
                <div className=' flex flex-col gap-3'>
                    <label htmlFor="lecDesc" className='text-sm'>Lecture Description<sup className='text-red-500'>*</sup></label>
                    <textarea name="lecDesc" rows={5} id="lecDesc" placeholder='Enter Lecture Description' className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300' {...register("lecDesc",{required:true})}></textarea>
                </div>
                 <div>
                    <Upload name={"lecVideo"} register={register} setValue={setValue} getValues={getValues}></Upload>
                </div>
                <div className=' flex justify-end'>
                    <button type='submit' className='p-2 px-6 cursor-pointer bg-yellow-50 text-richblack-900 font-semibold rounded-md '>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SubSectionalModal