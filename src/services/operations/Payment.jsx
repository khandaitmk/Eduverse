import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { payments } from '../apis';
import { apiConnector } from '../apiconnector';
import { resetCart } from '../../slices/cartSlice';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const payment= async({courses,userEmail},token,dispatch)=>{
    
    try{
        const response = await apiConnector(
            "POST",
            payments.PAYLINK,
            { courses, userEmail },
            { Authorization: `Bearer ${token}` }
        );
        if (response.data.success && response.data.url) {
            // Redirect to Stripe checkout
            window.location.href = response.data.url;
        } else {
            console.error("Failed to create checkout session");
        }
        console.log("PAYMENT :",response);
        dispatch(resetCart);
    } catch(error){
        console.log("ERROR IN PAYMENT :",error);
    }
};