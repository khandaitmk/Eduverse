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
        <div className=' flex justify-evenly items-center p-10 text-white'>
            {
                stat.map((data,index)=>{
                    return (
                        <div key={index} className=' felx flex-col gap-4'>
                            <h1 className='text-4xl font-bold text-center'>{data.count}</h1>
                            <h2 className=' text-richblack-600 font-bold'>{data.label}</h2>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
};

export default Stats;