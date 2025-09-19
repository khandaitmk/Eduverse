import React, { useEffect, useState } from 'react'
import { RiUploadCloud2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

function Upload(props) {
    const {name,register,setValue,getValues}=props;
    const [preview,setPreview] =useState(null);
    const [isDragging,setIsDragging]=useState(false);
    
    useEffect(()=>{
        register(name,{required:true});
    },[]);

    const handleChange =(event)=>{
        const file=event.target.files[0];
        const url=URL.createObjectURL(file);
        setPreview(url);
        setValue(name,file);
    };

    const removePreview =()=>{
        setPreview(null);
        setValue(name,null);
    };
    
    const handleDrop =(e)=>{
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file=e.dataTransfer.files[0];
            const url=URL.createObjectURL(file);
            setPreview(url);
            setValue(name,file);
            e.dataTransfer.clearData();
        }
    };

  return (
    <div>
        <div>
            <label htmlFor="" className='text-sm'>Lecture Video<sup className='text-red-500'>*</sup></label>
            <div
                onDragOver={(e)=>{
                    e.preventDefault();
                    setIsDragging(true)}
                }
                onDragLeave={()=>{
                    setIsDragging(false)}
                }
                onDrop={handleDrop}
             className={`bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300 `}>
                <input onChange={handleChange} style={{display:'none'}} type="file" accept='video/*' name={name} id={name} />
                <div>
                    {
                        (preview)?
                        (<div className='flex flex-col items-center justify-center gap-5'>
                            <video src={preview} controls></video>
                            <div onClick={removePreview} className='p-4 bg-richblack-900 flex items-center justify-center rounded-full cursor-pointer'><button className=' cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button></div>
                        </div>)
                        :
                        (<div className=' flex flex-col items-center justify-center w-[50%] mx-auto gap-5 h-32'>
                            <label htmlFor={name} className='bg-richblack-900 p-4 rounded-full cursor-pointer'><RiUploadCloud2Line size={"30px"} className='text-yellow-100'></RiUploadCloud2Line></label>
                            <p className='text-center'>Drag and drop an video, or click to <label htmlFor="lecVideo" className='text-yellow-100 font-semibold cursor-pointer'>Browse</label> a file</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload