import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../favourites.css';
import { base_url, base_url2 } from '../config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Favorites() {
    const [cars, setCars] = useState([]);
    const [cookies] = useCookies();

    const getCars = async () => {
        try {
            const response = await axios.get(base_url + '/favorites', { headers: { token: cookies.token } });
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching favorite cars:', error);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <Header />
            {cars.length ? (
                <div className='cardList-favorites fade-in'>
                    {cars.map((item, index) => {
                        return (
                            <div className='card-favourites' key={index}>
                                <a href={'/cardetails/' + item.id} key={index}>
                                    <div className='card'>
                                        <img style={{ maxWidth: "444px", maxHeight: "296px", objectFit: "contain" }} src={base_url2 + '/' + item.image} alt='car' />
                                        <div>
                                            <div className='mainInfo'>
                                                <p>{item.Brand.name + ' ' + item.Model.name + ' ' + item.engine + ' ' + item.power + 'kW'} { }</p>
                                                <p>{item.price + ' €'}</p>
                                                <p>{item.year}</p>
                                            </div>
                                            <div className='badges'>
                                                <span>{item.mileage}</span>
                                                <span>{item.fuel}</span>
                                                <span>{item.transmission}</span>
                                                <span>{item.bodyType}</span>
                                                <span>{item.drivetrain}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p style={{ fontSize: '32px', fontWeight: 'bold', width: '100%', marginTop: '50px', textAlign: 'center', color: '#fff' }}>You don't have favorite cars</p>
            )}
        </>
    );
}