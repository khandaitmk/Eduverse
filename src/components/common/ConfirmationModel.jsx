import React from 'react'

function ConfirmationModel({data}) {
  return (
    <div className=' fixed inset-0 backdrop-blur-sm flex items-center justify-center w-screen h-screen'>
      <div className='  max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 '>
        <div className=' flex flex-col gap-3  '>
            <h1 className=' text-4xl text-white'>{data.text1}</h1>
            <p className=' text-lg font-semibold text-richblack-500'>{data.text2}</p>
            <div className=' flex justify-evenly'>
                <button className=' p-2 px-4 bg-yellow-50 rounded-md cursor-pointer text-richblack-900 font-semibold' onClick={data.btn1Handler}>{data.btnText1}</button>
                <button className=' p-2 px-4 bg-yellow-50 rounded-md cursor-pointer text-richblack-900 font-semibold' onClick={data.btn2Handler}>{data.btnText2}</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModel