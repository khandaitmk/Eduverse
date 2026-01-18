import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PiCurrencyInrBold } from "react-icons/pi";
import { payment } from '../../../../services/operations/Payment';

// import buycourses from the operations 
function RenderTotalAmount() {
    const {cart, total} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state)=>state.profile);
    async function handleBuyCourses(){
        const courses =cart.map((course) => course._id);
        if(token){
            console.log(courses);
            console.log("user email :",user?.email);
            const result = await payment({courses,userEmail:user.email},token,dispatch);
        }
        else{
            navigate("/login");
        }
    }
  return (
    <div className=' bg-richblack-800 rounded-md w-full lg:w-[35%] h-fit overflow-hidden border border-richblack-600 lg:sticky lg:top-0'>
        <div className=' w-full p-6 md:p-8 lg:p-10 flex flex-col gap-4 md:gap-5'>
            <p className=' flex flex-col gap-2 md:gap-3'>
                <span className='text-richblack-500 text-sm md:text-base'>Total :</span>
                <span className=' text-yellow-50 text-2xl md:text-3xl flex font-semibold gap-0.5 items-center'><PiCurrencyInrBold></PiCurrencyInrBold> {total}</span>
            </p>
            <button className=' w-full p-2.5 md:p-2 bg-yellow-100 text-richblack-900 font-semibold rounded-md cursor-pointer text-sm md:text-base hover:bg-yellow-200 transition-colors' onClick={handleBuyCourses}>
                Buy Now
            </button>
        </div>
    </div>
  )
}

export default RenderTotalAmount