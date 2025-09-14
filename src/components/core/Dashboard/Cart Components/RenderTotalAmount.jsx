import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import buycourses from the operations 
function RenderTotalAmount() {
    const {cart, total} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const {token} = useSelector((state) => state.auth);

    function handleBuyCourses(){
        const courses =cart.map((course) => course._id);
        if(token){
            console.log(courses);
            // dispatch(buyCourses(token,courses,navigate,diapatch))
        }
        else{
            navigate("/login");
        }
    }
  return (
    <div>
        <div>
            <p>
                <span>Total :</span>
                <span>Rs. {total}</span>
            </p>
            <button onClick={handleBuyCourses}>
                Buy Now
            </button>
        </div>
    </div>
  )
}

export default RenderTotalAmount