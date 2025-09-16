import React, { useEffect } from 'react'
import { useState } from 'react';
import { set } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";


function ChipInputComponent(props) {
    const {register}=props;
    const [chip,setChip]=useState([]);
    const [inputValue,setInputValue]=useState("");

    useEffect(() =>{
        register(props.name,{required:true});
    },[props.name,register]);

    function handleKeyDown(e){
      if(e.key === "Enter" && inputValue.length > 0){
        e.preventDefault();
        const newChip=[...chip,inputValue];
        setChip(newChip);
        props.setValue(props.name,newChip);
        setInputValue("");
      }
    }
  
  function removeChip(index){
    const newChip=chip.filter((_,i) => i !== index);
    setChip(newChip);
    props.setValue(props.name,chip);
  };

  return (
    <div>
        <div className=' text-white flex flex-col w-full gap-3'>
          <label htmlFor="courseTag" className='text-sm'>{props.label} <sup className='text-red-500'>*</sup></label>

          <div className='flex gap-3 flex-wrap'>
            {
              chip.map((tag,index) =>{
                return(<div key={index} className=' bg-amber-500 rounded-full py-1 px-2 flex gap-2'>
                    {tag}
                    <button className=' cursor-pointer' onClick={() => removeChip(index)}> <RxCross2></RxCross2> </button>
                </div>);
              })
            }
          </div>

          <input 
              type="text" 
              onChange={(e) => {
              setInputValue(e.target.value);
              }}
              value={inputValue}
              onKeyDown={handleKeyDown}
              name="courseTag"
              id="courseTag"
              placeholder={props.placeholder} 
            //   {...register("courseTag" ,{required:true})}
              className=' bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300'/>
              
        </div>
    </div>
  )
}

export default ChipInputComponent