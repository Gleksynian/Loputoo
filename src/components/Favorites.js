import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../favourites.css';
import { base_url, base_url2 } from '../config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Favorites() {
    const [cars, setCars] = useState([]);
    const [cookies] = useCookies();
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCars = async () => {
        try {
            const response = await axios.get(base_url + '/favorites', { headers: { token: cookies.token } });
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching favorite cars:', error);
        }
    };

    const getBrands = async () => {
        try {
            const response = await axios.get(base_url + '/brands');
            if (Array.isArray(response.data)) {
                setBrands(response.data);
            } else {
                console.error("Brands response is not an array:", response.data);
            }

            const modelsResponse = await axios.get(base_url + '/models');
            if (Array.isArray(modelsResponse.data)) {
                setModels(modelsResponse.data);
            } else {
                console.error("Models response is not an array:", modelsResponse.data);
            }

            const carsResponse = await axios.get(base_url + '/cars');
            if (Array.isArray(carsResponse.data)) {
                setCars(carsResponse.data);
            } else {
                console.error("Cars response is not an array:", carsResponse.data);
            }

            setLoading(true);
        } catch (error) {
            console.error("Error fetching brands, models, or cars:", error);
        }
    };

    useEffect(() => {
        getBrands();
        getCars();
    }, []);

    return (
        <>
            <Header />
            {cars.length ? (
                <div className='cardList-favorites fade-in'>
                    {cars.map((item, index) => {
                        const brandName = item.Brand ? item.Brand.name : 'Unknown Brand';
                        const modelName = item.Model ? item.Model.name : 'Unknown Model';
                        return (
                            <div className='card-favourites' key={index}>
                                <a href={'/cardetails/' + item.id}>
                                    <div className='card'>
                                        <img style={{ maxWidth: "444px", maxHeight: "296px", objectFit: "contain" }} src={base_url2 + '/' + item.image} alt='car' />
                                        <div>
                                            <div className='mainInfo'>
                                                <p>{brandName + ' ' + modelName + ' ' + item.engine + ' ' + item.power + 'kW'}</p>
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
