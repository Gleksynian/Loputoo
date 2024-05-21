import React, { useEffect, useState } from 'react';
import '../profile.css';
import Header from './Header.js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { base_url, base_url2 } from '../config.js';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState({});
    const [models, setModels] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleOldPassword, setVisibleOldPassword] = useState(false);
    const [visibleNewPassword, setVisibleNewPassword] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await axios.get(base_url + '/users/' + id);
                setUser(result.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to load user data.');
            }
        };

        const findCarsByUserId = async () => {
            try {
                const result = await axios.get(`${base_url}/users/${id}/ads`);
                setCars(result.data);
            } catch (error) {
                console.error('Error fetching user ads:', error);
                setError('Failed to load user ads.');
            }
        };

        const getBrands = async () => {
            try {
                const result = await axios.get(`${base_url}/brands`);
                const brandsMap = result.data.reduce((acc, brand) => {
                    acc[brand.id] = brand.name;
                    return acc;
                }, {});
                setBrands(brandsMap);
            } catch (error) {
                console.error('Error fetching brands:', error);
                setError('Failed to load brands.');
            }
        };

        const getModels = async () => {
            try {
                const result = await axios.get(`${base_url}/models`);
                const modelsMap = result.data.reduce((acc, model) => {
                    acc[model.id] = model.name;
                    return acc;
                }, {});
                setModels(modelsMap);
            } catch (error) {
                console.error('Error fetching models:', error);
                setError('Failed to load models.');
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getUser(), findCarsByUserId(), getBrands(), getModels()]);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {};
        const email = event.target.elements.email.value;
        const phone = event.target.elements.phone.value;
        const oldPassword = event.target.elements.oldPassword.value;
        const newPassword = event.target.elements.newPassword.value;

        if (email && email !== user.email) {
            updatedUser.email = email;
        }
        if (phone && phone !== user.phone) {
            updatedUser.phone = phone;
        }
        if (oldPassword && newPassword) {
            updatedUser.oldPassword = oldPassword;
            updatedUser.newPassword = newPassword;
        }

        if (Object.keys(updatedUser).length > 0) {
            try {
                await axios.patch(`${base_url}/users/${id}`, updatedUser);
                setUser({ ...user, ...updatedUser });
                window.location.reload();
            } catch (error) {
                console.error('Error updating user:', error);
                setError('Failed to update user data.');
            }
        }
    };
    const toggleVisibleOldPassword = () => {
        setVisibleOldPassword(!visibleOldPassword);
    };

    const toggleVisibleNewPassword = () => {
        setVisibleNewPassword(!visibleNewPassword);
    };

    return (
        <>
            <Header />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : user ? (
                <div className='profile-page fade-in'>
                    <div className='profile-change'>
                        <h2 className='username'>{user.name}</h2>
                        <p className='old-email'>{user.email}</p>
                        <p className='old-phone-num'>{user.phone}</p>
                        <form className='profile-change-form' onSubmit={handleSubmit}>
                            <input placeholder='New phone number' type='text' name='phone' />
                            <input placeholder='New e-mail' type='email' name='email' />
                            <div className='password-input'>
                                <input placeholder='Old password' type={visibleOldPassword ? 'text' : 'password'} minLength={8} name='oldPassword' />
                                <div className='eye-icon' onClick={toggleVisibleOldPassword}>
                                    {visibleOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
                            <div className='password-input'>
                                <input placeholder='New password' type={visibleNewPassword ? 'text' : 'password'} minLength={8} name='newPassword' />
                                <div className='eye-icon' onClick={toggleVisibleNewPassword}>
                                    {visibleNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
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
                                        <img src={`${base_url2}/${item.image}`} alt='Img' />
                                        <div className='my-ad-card-div'>
                                            <div className='my-ad-card-info'>
                                                <p className='ad-name'>{brandName + ' ' + modelName + ' ' + item.engine + ' ' + item.power + 'kW'}</p>
                                                <p className='ad-price'>{item.price + ' €'}</p>
                                                <p className='ad-year'>{item.year}</p>
                                            </div>
                                            <div className='my-ad-buttons'>
                                                <button className='ad-delete-btn'>Delete</button>
                                                <button className='ad-edit-btn' onClick={() => navigate(`/editAnAd/${item.id}`)}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Profile;