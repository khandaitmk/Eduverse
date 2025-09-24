import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RenderCartCourse from './Cart Components/RenderCartCourse';
import RenderTotalAmount from './Cart Components/RenderTotalAmount';
function Cart() {
  const {total ,totalItems, cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className=' text-white w-11/12 mx-auto p-10 flex flex-col gap-5'>
      <h1 className=' text-3xl font-semibold'>Cart</h1>
      <div className=' flex flex-col gap-5'>
        <div className=' flex flex-col gap-2'>
          <p>{totalItems} course in cart</p>
          <div className='h-[1px] w-full bg-richblack-400'></div>
        </div>
      {
        (cart?.length > 0) ?(
          <div className=' flex gap-5 w-full'>
            <RenderCartCourse />
            <div className='w-[1px] bg-richblack-500'></div>
            <RenderTotalAmount></RenderTotalAmount>
          </div>
        ):(
          <p>Your cart is empty</p>
        )
      }
      </div>
      
    </div>
  )
}

export default Cart