import React, { useEffect, useState } from 'react';
import '../profile.css';
import Header from './Header.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url, base_url2 } from '../config.js';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState({});
    const [models, setModels] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const result = await axios.get(base_url + '/users/' + id);
            setUser(result.data);
        };

        const findCarsByUserId = async () => {
            const result = await axios.get(`${base_url}/users/${id}/ads`);
            setCars(result.data);
        };

        const getBrands = async () => {
            const result = await axios.get(`${base_url}/brands`);
            const brandsMap = result.data.reduce((acc, brand) => {
                acc[brand.id] = brand.name;
                return acc;
            }, {});
            setBrands(brandsMap);
        };

        const getModels = async () => {
            const result = await axios.get(`${base_url}/models`);
            const modelsMap = result.data.reduce((acc, model) => {
                acc[model.id] = model.name;
                return acc;
            }, {});
            setModels(modelsMap);
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getUser(), findCarsByUserId(), getBrands(), getModels()]);
            setLoading(false);
        };

        fetchData();
    }, [id]);
    return (
        <>
            <Header />
            {loading ? (
                <></>
            ) : user ? (
                <div className='profile-page'>
                    <div className='profile-change'>
                        <h2 className='username'>{user.name}</h2>
                        <p className='old-email'>{user.email}</p>
                        <p className='old-phone-num'>{user.phone}</p>
                        <form className='profile-change-form'>
                            <input placeholder='New phone number' type='text' />
                            <input placeholder='New e-mail' type='email' />
                            <input placeholder='Old password' type='password' />
                            <input placeholder='New password' type='password' />
                            <button type='submit'>Confirm</button>
                        </form>
                    </div>
                    <div className='my-ads'>
                        <h2 className='my-ads-header'>My ads</h2>
                        <div className='my-ad-list'>
                            {cars.map((item) => {
                                const brandName = brands[item.brand];
                                const modelName = models[item.model];
                                return (
                                    <div className='my-ad-card' key={item.id}>
                                        <img src={base_url2 + '/' + item.image} alt='Img' />
                                        <div>
                                            <div className='my-ad-card-info'>
                                                <p className='ad-name'>{brandName + ' ' + modelName + ' ' + item.engine + ' ' + item.power + 'kW'}</p>
                                                <p className='ad-price'>{item.price + ' €'}</p>
                                                <p className='ad-year'>{item.year}</p>
                                            </div>
                                            <div className='my-ad-buttons'>
                                                <button className='ad-edit-btn'>Edit</button>
                                                <button className='ad-delete-btn'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (<></>)
            }
        </>
    );
}

export default Profile;