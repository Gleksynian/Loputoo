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
                        <input placeholder='Новый номер телефона' type='text'></input>
                        <input placeholder='Новая почта' type='email'></input>
                        <input placeholder='Старый пароль' type='password'></input>
                        <input placeholder='Новый пароль' type='password'></input>
                        <button type='submit'>Подтвердить</button>
                    </form>
                </div>
                <div className='my-ads'>
                    <h2 className='my-ads-header'>Мои объявления</h2>
                    <div className='my-ad-list'>
                        <div className='my-ad-card'>
                            <img src={car} alt='car' />
                            <div>
                                <div className='my-ad-card-info'>
                                    <p>Skoda Superb</p>
                                    <p>13500e</p>
                                    <p>2017</p>
                                </div>
                                <div className='my-ad-buttons'>
                                    <form className='ad-profile'>
                                        <button className='ad-edit-btn'>Редактировать</button>
                                        <button className='ad-delete-btn'>Удалить</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile