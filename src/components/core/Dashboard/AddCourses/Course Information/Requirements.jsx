import React, { use } from 'react'
import { useState,useEffect } from 'react';

function Requirements(props) {
    const {name,register,setValue,getValues,requirementList,setRequirementList}=props;
    const [req,setReq]=useState("");
    
    useEffect(() =>{
        register(name,{required:true});
    },[]);

    function addRequirement(event){
        event.preventDefault();        
        if(req.length >0){
            const newRequirementList=[...requirementList,req];
            setRequirementList(newRequirementList);
            setValue(name,newRequirementList);
        }
    };

    function removeRequirement(index){
        const newRequirementList=requirementList.filter((_,i) => i !== index);
        setRequirementList(newRequirementList);
        setValue(name,newRequirementList);
    };
  return (
    <div className=' flex flex-col gap-4'>
        <div className=' text-white flex flex-col gap-3'>
            <label htmlFor={name} className='text-sm'>Requirements/Instructions <sup className='text-red-500'>*</sup></label>
            <input type="text" value={req} onChange={(e)=>{setReq(e.target.value)}}  name={name} id={name} className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300'/>
        </div>
        <div>
            <button className='text-yellow-100 font-bold text-lg cursor-pointer' onClick={addRequirement}  >Add</button>
        </div>
        <div>
            {
                requirementList.map((req,index) =>{
                    return(<div key={index} className='flex gap-3 items-center'>
                        <div className='text-white'>{req}</div>
                        <div className='text-sm'><button onClick={()=>removeRequirement(index)}>clear</button></div>
                    </div>);
                })
            }
        </div>
    </div>
  )
}

export default Requirements