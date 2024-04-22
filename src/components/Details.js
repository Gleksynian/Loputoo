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
                        <p>Тип кузова: </p>
                        <p>Год выпуска: </p>
                        <p>Двигатель: </p>
                        <p>Топливо: </p>
                        <p>Пробег: </p>
                        <p>Привод: </p>
                        <p>Коробка передач: </p>
                        <p>Цвет: </p>
                        <p>Рег. номер: </p>
                        <p>Город: </p>
                        <p className='priceStyle'>Цена: </p>
                        <p className='additionalInfo'>Дополнительная информация</p>
                        <p className='additionalInfoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, augue non euismod condimentum, velit enim faucibus felis, nec volutpat turpis dolor ac dolor. Aliquam vel venenatis magna, quis posuere magna. Integer sollicitudin turpis quis velit fringilla iaculis. Vestibulum vitae nibh lobortis, gravida tortor sit amet, auctor dolor.</p>
                        <button className='addToFavourites'>Добавить в избранное</button>
                        <button>Связаться с продавцом</button>
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