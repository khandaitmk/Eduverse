import React from 'react'
import ReactStars from 'react-stars'
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from '../../../../slices/cartSlice';

function RenderCartCourse() {
    const {cart} =useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
        {
            cart.map((course,index) =>{
                return (
                    <div key={index}>
                        <div>
                            <img src={course?.thumbnail} alt="Thumbnail of the course" />
                            <div>
                                <h1>{course.coursename}</h1>
                                <p>{course?.category?.name}</p>
                            </div>
                            <div>
                                <span>4.5</span> //this is for the avg. rating
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<i className="far fa-star"></i>}
                                fullIcon={<i className="fas fa-star"></i>}
                                ></ReactStars>
                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                            <div>
                                <p>Rs. {course?.price}</p>
                                <button onClick={()=>{dispatch(removeFromCart(course._id))}}>
                                    <FaTrashAlt></FaTrashAlt>
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
};

export default RenderCartCourse;