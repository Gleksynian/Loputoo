import React from 'react'
import car from "../assets/car.png"
import Header from './Header'
import '../favourites.css'

export default function Favourites() {
    return (
        <>
        <Header />
            <div className='cardList'>
                <div className='card-favourites'>
                    <img src={car} alt='car' />
                    <div>
                        <div className='mainInfo'>
                            <p>Skoda Superb</p>
                            <p>13500e</p>
                            <p>2017</p>
                        </div>
                        <div className='badges'>
                            <span>188500km</span>
                            <span>Diesel</span>
                            <span>Automat</span>
                            <span>Avant</span>
                            <span>Foreground</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cardList'>
                <a href='/cardetails/2'>
                    <div className='card-favourites'>
                        <img src={car} alt='car' />
                        <div>
                            <div className='mainInfo'>
                                <p>Skoda Superb</p>
                                <p>13500e</p>
                                <p>2017</p>
                            </div>
                            <div className='badges'>
                                <span>188500km</span>
                                <span>Diesel</span>
                                <span>Automat</span>
                                <span>Avant</span>
                                <span>Foreground</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}
