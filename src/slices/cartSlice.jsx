import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState={
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const course = action.payload;
            const existingCourse = state.cart.find(item => item._id === course._id);
            if(existingCourse){
                toast.error("Course already in cart");
                return;
            }

             state.cart.push(course);
             state.total += Number(course.price);
             state.totalItems += 1;
                localStorage.setItem('cart',JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                toast.success("Course added to cart");
        },
        removeFromCart: (state,action) => {
            const courseId = action.payload;
            const courseIndex = state.cart.findIndex(item => item._id === courseId);
            if(courseIndex === -1){
                toast.error("Course not found in cart");
                return;
            }
            const course = state.cart[courseIndex];
            state.cart.splice(courseIndex,1);
            state.total -= Number(course.price) || 0;
            state.totalItems -= 1;
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            toast.success("Course removed from cart");

        },
        resetCart:(state) =>{
            state.cart = [];
            state.total = 0;    
            state.totalItems = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('totalItems');
            toast.success("Cart reset successfully");

        }
    }
});

export const {addToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;