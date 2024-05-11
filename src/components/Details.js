import React, { useState, useEffect, useRef } from "react";
import '../details.css'
import '../App.css'
import Header from './Header.js'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import car1 from '../assets/car1.jpg'
import car3 from '../assets/car3.jpg'
import car2 from '../assets/car2.jpg'

function Details() {
    const { id } = useParams()
    return (
        <div>
            <Header />
            <div className='details'>
                <h2>Skoda</h2>
                <div className="horizontal-divs">
                    <div className='carInfo'>
                        <p>Body type: </p>
                        <p>Year: </p>
                        <p>Engine: </p>
                        <p>Fuel: </p>
                        <p>Mileage: </p>
                        <p>Drivetrain: </p>
                        <p>Transmission: </p>
                        <p>Color: </p>
                        <p>Reg. number: </p>
                        <p>Location: </p>
                        <p className='priceStyle'>Price: </p>
                        <p className='additionalInfo'>Additional information</p>
                        <p className='additionalInfoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, augue non euismod condimentum, velit enim faucibus felis, nec volutpat turpis dolor ac dolor. Aliquam vel venenatis magna, quis posuere magna. Integer sollicitudin turpis quis velit fringilla iaculis. Vestibulum vitae nibh lobortis, gravida tortor sit amet, auctor dolor.</p>
                        <button className='addToFavourites'>Add to favorites</button>
                        <button>Contact the seller</button>
                    </div>
                    <div className="swiperdiv">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation

                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            loop={true}
                            effect="fade"
                        >
                            <SwiperSlide style={{backgroundImage:`url(${car1})`}}></SwiperSlide>
                            <SwiperSlide style={{backgroundImage:`url(${car3})`}}></SwiperSlide>
                            <SwiperSlide style={{backgroundImage:`url(${car2})`}}></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details