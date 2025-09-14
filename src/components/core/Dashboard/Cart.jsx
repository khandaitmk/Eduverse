import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RenderCartCourse from './Cart Components/RenderCartCourse';
import RenderTotalAmount from './Cart Components/RenderTotalAmount';
function Cart() {
  const {total ,totalItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className=' text-white'>
      <h1>Cart</h1>
      <p>{totalItems} in cart</p>
      {
        (total>0) ?(
          <div>
            <RenderCartCourse />
            <RenderTotalAmount></RenderTotalAmount>
          </div>
        ):(
          <p>Your cart is empty</p>
        )
      }
      
    </div>
  )
}

export default Cart