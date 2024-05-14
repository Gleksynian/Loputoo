import React from 'react'
import '../profile.css'
import Header from './Header.js';
import car from "../assets/car.png"

function Profile() {
    return (
        <>
            <Header />
            <div className='profile-page'>
                <div className='profile-change'>
                    <h2 className='username'>Username</h2>
                    <p className='old-email'>e-mail@gmail.com</p>
                    <p className='old-phone-num'>+3725555555</p>
                    <form className='profile-change-form'>
                        <input placeholder='New phone number' type='text'></input>
                        <input placeholder='New e-mail' type='email'></input>
                        <input placeholder='Old password' type='password'></input>
                        <input placeholder='New password' type='password'></input>
                        <button type='submit'>Confirm</button>
                    </form>
                </div>
                <div className='my-ads'>
                    <h2 className='my-ads-header'>My ads</h2>
                    <div className='my-ad-list'>
                        <div className='my-ad-card'>
                            <img src={car} alt='car' />
                            <div>
                                <div className='my-ad-card-info'>
                                    <p className='ad-name'>Skoda Superb</p>
                                    <p className='ad-price'>13500e</p>
                                    <p className='ad-year'>2017</p>
                                </div>
                                    <button className='ad-edit-btn'>Edit</button>
                                    <button className='ad-delete-btn'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile