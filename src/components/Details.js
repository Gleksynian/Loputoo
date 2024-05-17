import React, { useState, useEffect, useRef } from "react";
import '../details.css'
import '../App.css'
import Header from './Header.js'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { base_url, base_url2 } from "../config.js";
import { useCookies } from "react-cookie";

function Details() {
    const { id } = useParams()
    const [car, setCar] = useState()
    const [phone, setPhone] = useState("Contact The Seller")
    const [isFavorites, setIsFavorites] = useState(false)
    const [cookies, setCookie] = useCookies()
    const addToFavorites = async () => {
        await axios.post(base_url + '/favorites/' + id, {}, {
            headers: {
                token: cookies.token
            }
        })
        setIsFavorites(true)
    }
    const deleteFromFavorites = async () => {
        await axios.delete(base_url + '/favorites/' + id, {
            headers: {
                token: cookies.token
            }
        })
        setIsFavorites(false)
    }

    const checkIsInFavorites = async () => {
        if (cookies.token) {
            const response = await axios.get(base_url + '/favorites/' + id, {
                headers: {
                    token: cookies.token
                }
            })
            console.log(response);
            setIsFavorites(response.data)
        }
    }

    useEffect(() => {
        const getCar = async () => {
            const result = await axios.get(base_url + '/cars/' + id)
            setCar(result.data)
        }
        getCar()
        checkIsInFavorites()
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
                                <p className='priceStyle'>Price: {car.price + ' €'}</p>
                                <p className='additionalInfo'>Additional information</p>
                                <p className='additionalInfoText'>{car.description}</p>
                                {cookies.token ? (isFavorites ?
                                    <button onClick={deleteFromFavorites} className='addToFavourites'>Delete from favorites</button>
                                    :
                                    <button onClick={addToFavorites} className='addToFavourites'>Add to favorites</button>)
                                    :<></>
                                }
                                <button onClick={() => {
                                    setPhone(car.User.phone)
                                }}>{phone}</button>
                            </div>
                            <div className="swiperdiv">
                                <img src={base_url2 + '/' + car.image} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>
    )
}

export default Details