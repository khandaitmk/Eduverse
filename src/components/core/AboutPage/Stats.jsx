import React from 'react'

const stat=[
    {count: "1K", label: "Active Students"},
    {count: "5+", label: "Mentors"},
    {count: "25+", label: "Courses"},
    {count: "5+", label: "Awards"},
]
function Stats() {
    
  return (
    <div className='bg-richblack-800'>
        <div className=' flex flex-col sm:flex-row justify-evenly items-center p-6 md:p-8 lg:p-10 text-white gap-6 md:gap-8'>
            {
                stat.map((data,index)=>{
                    return (
                        <div key={index} className=' flex flex-col gap-2 md:gap-4'>
                            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>{data.count}</h1>
                            <h2 className=' text-richblack-600 font-bold text-sm md:text-base text-center'>{data.label}</h2>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
};

export default Stats;