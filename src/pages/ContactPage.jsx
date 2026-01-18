import React from 'react'
import Footer from '../components/core/Homepage/Footer';
import ContactForm from '../components/common/ContactForm';
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import { IoCall } from "react-icons/io5";


function ContactPage() {
  return (
    <div className=' mt-8 md:mt-12 lg:mt-15'>
        {/* section 1 */}
        <section className=' flex flex-col lg:flex-row mb-10 md:mb-12 lg:mb-15 justify-center gap-6 md:gap-10 lg:gap-20 px-4 md:px-6'>
            <div className=' flex flex-col text-richblack-500 bg-richblack-800 h-fit rounded-md gap-6 md:gap-8 lg:gap-10 p-6 md:p-8 lg:p-10 w-full lg:w-[30%]'>
                <div className=' flex flex-col gap-2 '>
                    <div className=' flex items-center gap-2 '>
                        <IoChatbubblesSharp className="text-xl md:text-2xl"></IoChatbubblesSharp>
                        <h1 className='text-white font-semibold text-base md:text-lg'>Chat with us</h1>
                    </div>
                    <p className=' font-semibold text-sm md:text-base'>Our friendly team is here to help.</p>
                    <p className=' font-semibold text-sm md:text-base'>manishkhandait05@gmail.com</p>

                </div>

                <div className=' flex flex-col gap-2 '>
                    <div className=' flex items-center gap-2 '>
                        <IoMdGlobe className="text-xl md:text-2xl"></IoMdGlobe>
                        <h1 className='text-white font-semibold text-base md:text-lg'>Visit Us</h1>
                    </div>
                    <p className=' font-semibold text-sm md:text-base'>Come and say hellow to our office HQ.</p>
                    <p className=' font-semibold text-sm md:text-base'>shila Nagar, gittikhadan, Nagpur</p>

                </div>

                <div className=' flex flex-col gap-2'>
                    <div className=' flex items-center gap-2 '>
                        <IoCall className="text-xl md:text-2xl"></IoCall>
                        <h1 className='text-white font-semibold text-base md:text-lg'>Call us</h1>
                    </div>
                    <p className=' font-semibold text-sm md:text-base'>Mon - Fri from 8 am to 5 pm </p>
                    <p className=' font-semibold text-sm md:text-base'>9191919911</p>

                </div>
            </div>

            <div className=' border-2 border-richblack-500 rounded-md p-6 md:p-10 lg:p-15 w-full lg:w-auto flex-1'>
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