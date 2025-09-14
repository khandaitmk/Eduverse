import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText';
import image1 from "../assets/images/aboutus1.webp"
import image2 from "../assets/images/aboutus2.webp"
import image3 from "../assets/images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote';
import Foundingstory from "../assets/images/FoundingStory.png"
import Stats from '../components/core/AboutPage/Stats';
import GridItem from '../components/core/AboutPage/GridItem';
import ContactForm from '../components/common/ContactForm';
import Footer from '../components/core/Homepage/Footer'

function AboutPage() {
  return (
    <div >
        {/* section 1 */}
        <section className=' relative bg-richblack-700 text-white font-inter'>
            <div className='w-11/12 mx-auto flex flex-col justify-center items-center p-20'>
                <header className=' flex flex-col justify-center items-center gap-5 pb-10 w-full'>
                    <h1 className=' font-bold text-4xl w-[65%] mx-auto text-center'>Driving Innovation in Online Education for a <span className='bg-clip-text text-transparent bg-gradient-to-br from-[#2bc6ec] via-[#23fdbf] to-[#FCB045]'>Bright Future</span></h1>
                    <p className=' text-richblack-500 text-md font-semibold w-[60%] text-center'>Eduverse is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className='h-[150px]'></div>
                <div className=' absolute flex gap-10 justify-center bottom-0 translate-y-[35%]'>
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                    <img src={image3} alt="" />
                </div>
            </div>
        </section>
        {/* section 2 */}
        {/* Quote */}
        <section>
            <Quote></Quote>
        </section>
        {/* section 3 */}
        <section className=' flex flex-col gap-10 mb-20'>
            <div className=' flex font-inter text-richblack-200 justify-center items-center gap-10'>
                <div className=' flex flex-col w-[40%] mx-auto p-20 gap-8'>
                    <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'>Our Founding Story</h1>
                    <p className=' font-semibold'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className=' font-semibold'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div className='w-[40%] mx-auto'>
                    <img className=' shadow-[0px_0px_25px_1px] shadow-red-400' src={Foundingstory} alt="" />
                </div>
            </div>
            <div className=' flex  p-8 text-richblack-100' >
                <div className=' flex flex-col gap-8 w-[35%] mx-auto'>
                    <h1 className=' text-4xl font-bold font-inter bg-clip-text text-transparent bg-gradient-to-br from-[#f1501f] via-[#fd4723] to-[#FCB045]'>Our Vision</h1>
                    <p className=' font-semibold'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div className='flex flex-col gap-8 w-[35%] mx-auto'>
                    <h1 className=' text-4xl font-bold font-inter bg-clip-text text-transparent bg-gradient-to-br from-[#2bc6ec] via-[#23fdbf] to-[#FCB045]'>Our Mission</h1>
                    <p className=' font-semibold'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </section>

        {/* section 4 --Stats*/}
        <section>
            <Stats></Stats>
        </section>

        {/* Section 5 --Grid */}
        <section>
            <GridItem></GridItem>
        </section>

        {/* section 5 -- Form*/}
        <section className=' flex flex-col w-[40%] mx-auto p-10 gap-4'>
            <div className=' felx flex-col'>
                <h1 className=' text-4xl font-inter font-bold text-white text-center'>Get in Touch</h1>
                <p className=' text-richblack-700 font-semibold text-center'>We'd love to here you, Please fill out this form</p>
            </div>
            <ContactForm></ContactForm>
        </section>

        {/* review  */}
        <section>

        </section>

        {/* footer */}
        <section className='bg-richblack-800'>
            <Footer></Footer>
        </section>
    </div>
  )
};

export default AboutPage;