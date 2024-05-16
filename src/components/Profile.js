import React, { useEffect, useState } from 'react';
import '../profile.css';
import Header from './Header.js';
import car from "../assets/car.png";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url } from '../config.js';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await axios.get(base_url + '/users/' + id);
                setUser(result.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const findCarsByUserId = async () => {
            try {
                const result = await axios.get(base_url + '/users/' + id + '/ads');
                setCars(result.data);
            } catch (error) {
                console.error("Error fetching user ads:", error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getUser(), findCarsByUserId()]);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Header />
            {loading ? (
                <p>Loading...</p>
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
                            {cars.map((item, index) => {
                                return (
                                    <div className='my-ad-card' key={item.id}>
                                        <img src={base_url + '/' + item.image} />
                                        <div>
                                            <div className='my-ad-card-info'>
                                                <p className='ad-name'>{(item.Brand && item.Brand.name) + ' ' + (item.Model && item.Model.name)}</p>

                                                <p className='ad-price'>{item.price}e</p>
                                                <p className='ad-year'>{item.year}</p>
                                            </div>
                                            <button className='ad-edit-btn'>Edit</button>
                                            <button className='ad-delete-btn'>Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (<></>)
            }
        </>
    )
}

export default Profile;
