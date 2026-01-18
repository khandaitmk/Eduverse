import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../App.css';
import { Navigation, Pagination, Mousewheel, Keyboard,Autoplay} from 'swiper/modules';
import CatalogCard from './CatalogCard';

function CourseSlider(props) {
    const {courses} = props;

  return (
    <div>
        <Swiper
        mousewheel={
                      {
                          enabled: true,
                          forceToAxis: true,
                      } 
                 }
                 keyboard={
                      {
                          enabled: true,
                          onlyInViewport: true,
                      }
                 }
            slidesPerView={1}       // Mobile: 1 slide
            breakpoints={{
                640: {
                    slidesPerView: 2,  // Small screens: 2 slides
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,  // Medium screens: 3 slides
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4,  // Large screens: 4 slides
                    spaceBetween: 20,
                },
            }}
            spaceBetween={5}       // Space between slides in px
            loop={true}             // Enable continuous loop
            autoplay={{
                delay: 2500,          // Delay between auto slides (2.5 seconds)
                disableOnInteraction: false,  // Continue autoplay after user interaction
            }}
            pagination={{
                type: "dynamic",     // Show fraction like 1/5
            }}
            navigation={true}       // Show prev/next arrows
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            >
                {
                    courses.map((course,index)=>(
                        <SwiperSlide key={index} className='p-2'>
                            <CatalogCard course={course} Height={"lg:h-[250px] h-[100px]"}></CatalogCard>
                        </SwiperSlide>
                    ))
                }
      </Swiper>
    </div>
  )
}

export default CourseSlider