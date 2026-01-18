import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RenderCartCourse from './Cart Components/RenderCartCourse';
import RenderTotalAmount from './Cart Components/RenderTotalAmount';
function Cart() {
  const {total ,totalItems, cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className=' text-white w-full lg:w-11/12 mx-auto p-4 md:p-6 lg:p-10 flex flex-col gap-4 md:gap-5'>
      <h1 className=' text-2xl md:text-3xl font-semibold'>Cart</h1>
      <div className=' flex flex-col gap-4 md:gap-5'>
        <div className=' flex flex-col gap-2'>
          <p className="text-sm md:text-base">{totalItems} course in cart</p>
          <div className='h-[1px] w-full bg-richblack-400'></div>
        </div>
      {
        (cart?.length > 0) ?(
          <div className=' flex flex-col lg:flex-row gap-4 md:gap-5 w-full'>
            <div className="flex-1">
              <RenderCartCourse />
            </div>
            <div className='w-full lg:w-[1px] h-[1px] lg:h-auto bg-richblack-500'></div>
            <div className="lg:w-[350px]">
              <RenderTotalAmount></RenderTotalAmount>
            </div>
          </div>
        ):(
          <p className="text-sm md:text-base">Your cart is empty</p>
        )
      }
      </div>
      
    </div>
  )
}

export default Cart