import React from 'react'

function ConfirmationModel({data}) {
  return (
    <div className=' w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2  '>
        <div className=' flex flex-col gap-3  '>
            <h1 className=' text-4xl text-white'>{data.text1}</h1>
            <p className=' text-lg font-semibold text-richblack-500'>{data.text2}</p>
            <div className=' flex justify-evenly'>
                <button className=' p-2 px-4 bg-yellow-200 rounded-md cursor-pointer' onClick={data.btn1Handler}>{data.btnText1}</button>
                <button className=' p-2 px-4 bg-yellow-200 rounded-md cursor-pointer' onClick={data.btn2Handler}>{data.btnText2}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModel