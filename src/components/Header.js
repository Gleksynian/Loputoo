import React, { useState } from 'react';
import Modal from 'react-modal';
import '../App.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [cookies, setCookies] = useCookies()

    const openLoginModal = () => {
        setModalLogin(true);
    };

    const closeLoginModal = () => {
        setModalLogin(false);
    };

    const openRegisterModal = () => {
        setModalIsOpen(true);
    };

    const closeRegisterModal = () => {
        setModalIsOpen(false);
    };
    const formHandler = async() => {
        const response = await axios.post('http://localhost:5000/users/login/')
        setCookies('token', response.access_token)
    }
    //Модальное окно логина
    const loginModal = (
        <div className='window'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1>Вход</h1>
                </div>
                <div className='registerDivWindow'>
                    <h1>Регистрация</h1>
                </div>
            </div>
            <div className='formLogin'>
                <form>
                    <input className='input-mail' type='text' placeholder='E-Mail'></input>
                    <input className='input-password' type='password' placeholder='Пароль'></input>
                    <button className='login-button'>Войти</button>
                </form>
            </div>
        </div>
    )
    //Модальное окно регистрации
    const registerModal = (
        <div className='window'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1 className='active'>Вход</h1>
                </div>
                <div className='registerDivWindow'>
                    <h1>Регистрация</h1>
                </div>
            </div>
            <div className='formRegister'>
                <form onSubmit={formHandler}>
                    <input className='input-name-register' type='text' placeholder='Имя'></input>
                    <input className='input-mail-register' type='text' placeholder='E-Mail'></input>
                    <input className='input-password-register' type='password' placeholder='Пароль'></input>
                    <input className='input-password-again' type='password' placeholder='Подтвердите пароль'></input>
                    <button className='register-button' type='submit'>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
    return (
        <header>
            <h1><a href='/'>AutoKaup24</a></h1>
            <ul>
                <li>
                    <a href='/placeAnAd'>Создать объявление</a>
                </li>
                <li>
                    <a href='/favourites'>Избранное</a>
                </li>
            </ul>
            <ul className='login-register'>
                <li>
                    <button onClick={openLoginModal}>Войти</button>
                </li>
                <Modal isOpen={modalLogin} onRequestClose={closeLoginModal}>
                    {loginModal}
                </Modal>
                <li>
                    <button onClick={openRegisterModal}>Зарегистрироваться</button>
                </li>
                <Modal isOpen={modalIsOpen} onRequestClose={closeRegisterModal}>
                    {registerModal}
                </Modal>
            </ul>
        </header>
    )
}

export default Header
