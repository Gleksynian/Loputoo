import React, { useEffect, useState } from 'react'
import car from "../assets/car.png"
import Header from './Header'
import '../favourites.css'
import { base_url, base_url2 } from '../config'
import axios from 'axios'
import { useCookies } from 'react-cookie'

export default function Favorites() {
    const [cars, setCars] = useState([])
    const [cookies, setCookie] = useCookies()

    const getCars = async () => {
        const response = await axios.get(base_url + '/favorites', { headers: { token: cookies.token } })
        setCars(response.data)
    }
    useEffect(() => {
        getCars()
    }, [])
    return (
        <>
            <Header />
            {cars.length ? (<div className='cardList'>
                {cars.map((item, index) => {
                    return (
                        <div className='card-favourites'>
                            <a href={'/cardetails/' + item.Car.id}>
                                <div className='card'>
                                    <img style={{ maxWidth: "444px", maxHeight: "296px", objectFit: "contain" }} src={base_url2 + '/' + item.Car.image} alt='car' />
                                    <div>
                                        <div className='mainInfo'>
                                            <p>{item.Car.Brand.name + ' ' + item.Car.Model.name + ' ' + item.Car.engine + ' ' + item.Car.power + 'kW'} { }</p>
                                            <p>{item.Car.price + ' €'}</p>
                                            <p>{item.Car.year}</p>
                                        </div>
                                        <div className='badges'>
                                            <span>{item.Car.mileage}</span>
                                            <span>{item.Car.fuel}</span>
                                            <span>{item.Car.transmission}</span>
                                            <span>{item.Car.bodyType}</span>
                                            <span>{item.Car.drivetrain}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>) : (<p style={{ fontSize: '32px', fontWeight: 'bold', width: '100%', marginTop: '50px', textAlign: 'center', color: '#fff' }}>You don't have favorites cars</p>)}
        </>
    )
}
