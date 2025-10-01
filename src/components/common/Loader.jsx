import React from 'react'

function Loader() {
  return (
    <div className='fixed  inset-0 z-[9999] flex items-center justify-center bg-richblack-900/40 '>
      <div className='loader'></div>
    </div>
  )
}

export default Loader