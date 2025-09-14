import React from 'react'
import Footer from '../components/core/Homepage/Footer';
import ContactForm from '../components/common/ContactForm';
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import { IoCall } from "react-icons/io5";


function ContactPage() {
  return (
    <div className=' mt-15'>
        {/* section 1 */}
        <section className=' flex  mb-15 justify-center gap-20'>
            <div className=' flex flex-col text-richblack-500 bg-richblack-800 h-fit rounded-md gap-10 p-10 w-[30%]'>
                <div className=' flex flex-col '>
                    <div className=' flex items-center '>
                        <IoChatbubblesSharp ></IoChatbubblesSharp>
                        <h1 className='text-white font-semibold  text-lg'>Chat on us</h1>
                    </div>
                    <p className=' font-semibold'>Our friendly team is here to help.</p>
                    <p className=' font-semibold'>@mail address</p>

                </div>

                <div className=' flex flex-col '>
                    <div className=' flex items-center '>
                        <IoMdGlobe></IoMdGlobe>
                        <h1 className='text-white font-semibold  text-lg'>Visit Us</h1>
                    </div>
                    <p className=' font-semibold'>Come and say hellow to our office HQ.</p>
                    <p className=' font-semibold'>shila Nagar, gittikhadan, Nagpur</p>

                </div>

                <div className=' flex flex-col'>
                    <div className=' flex items-center '>
                        <IoCall></IoCall>
                        <h1 className='text-white font-semibold  text-lg'>Call us</h1>
                    </div>
                    <p className=' font-semibold'>Mon - Fir from 8am to 5pm </p>
                    <p className=' font-semibold'>123456</p>

                </div>
            </div>

            <div className=' border-2 border-richblack-500 rounded-md p-15'>
                <ContactForm></ContactForm>
            </div>
        </section>

        {/* section 2 */}
        <section>

        </section>

        {/* footer */}
        <section className='bg-richblack-800'>
            <Footer></Footer>
        </section>
    </div>
  )
}

export default ContactPage;