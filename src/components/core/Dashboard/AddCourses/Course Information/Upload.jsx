import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { RiUploadCloud2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";


function Upload(props) {
    const {name,register,setValue,getValues,label}=props;
    const [preview,setPreview]=useState(null);
    const [isDragging,setIsDragging]=useState(false);
    useEffect(()=>{
        register(name,{required:true});
    },[]);

    function handleChange(event){
        const file=event.target.files[0];
        // console.log("file in upload component",event);
        const url=URL.createObjectURL(file);
        console.log("url in upload component",url);
        setPreview(url);
        setValue(name,file);
    };

    function removePreview(){
        setPreview(null);
        setValue(name,null);
    };

    function handleDrop(e){
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
        <div className='flex flex-col gap-3'>
            <label htmlFor={name}  className='text-white text-sm'>{label} <sup className='text-red-500'>*</sup></label>
            <div 
            onDragOver={(e)=>{e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={()=>setIsDragging(false)}
            onDrop={handleDrop}  

            className={`bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300 ${isDragging ? "border-yellow-100 border-dashed border-1" : "" }`}> 
                <input onChange={handleChange} style={{display:'none'}} id={name}  type="file" accept='image/*' name={name} />
                <div className='flex flex-col p-5'>
                    {
                        preview ? 
                        (<div className='flex flex-col items-center justify-center gap-5'>
                            <img   src={preview} alt="preview" className='w-full'/>
                            <div onClick={removePreview} className='p-4 bg-richblack-900 flex items-center justify-center rounded-full cursor-pointer'><button className=' cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button></div>
                        </div>)
                         : 
                        (
                            <div className=' flex flex-col items-center justify-center w-[50%] mx-auto gap-5 h-32'>
                        <label htmlFor={name} className='bg-richblack-900 p-4 rounded-full cursor-pointer'><RiUploadCloud2Line size={"30px"} className='text-yellow-100'></RiUploadCloud2Line></label>
                        <p className='text-center'>Drag and drop an image, or click to <label htmlFor={name} className='text-yellow-100 font-semibold cursor-pointer'>Browse</label> a file</p>
                        </div>
                        )
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Upload