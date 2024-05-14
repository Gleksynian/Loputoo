import React, { useState, useEffect, useRef } from "react";
import '../details.css'
import '../App.css'
import Header from './Header.js'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { base_url } from "../config.js";

function Details() {
    const { id } = useParams()
    const [car, setCar] = useState()
    const [phone, setPhone] = useState("Contact The Seller")

    useEffect(() => {
        const getCar = async () => {
            const result = await axios.get(base_url + '/cars/' + id)
            setCar(result.data)
        }
        getCar()
    }, [])
    return (
        <>
            {car ? (
                <div>
                    <Header />
                    <div className='details'>
                        <h2>{car.Brand.name + ' ' + car.Model.name}</h2>
                        <div className="horizontal-divs">
                            <div className='carInfo'>
                                <p>Body type: {car.bodyType}</p>
                                <p>Year: {car.year}</p>
                                <p>Engine: {car.engine + ' ' + car.power + 'kW'}</p>
                                <p>Fuel: {car.fuel}</p>
                                <p>Mileage: {car.mileage}</p>
                                <p>Drivetrain: {car.drivetrain}</p>
                                <p>Transmission: {car.transmission}</p>
                                <p>Color: {car.color}</p>
                                <p>Reg. number: {car.number}</p>
                                <p>Location: {car.City.name}</p>
                                <p className='priceStyle'>Price: {car.price}</p>
                                <p className='additionalInfo'>Additional information</p>
                                <p className='additionalInfoText'>{car.description}</p>
                                <button className='addToFavourites'>Add to favorites</button>
                                <button onClick={()=>{
                                    setPhone(car.User.phone)
                                }}>{phone}</button>
                            </div>
                            <div className="swiperdiv">
                                <img src={base_url + '/' + car.image} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>
    )
}

export default Details