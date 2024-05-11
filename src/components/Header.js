import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../App.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [cookies, setCookies] = useCookies()
    const [credentials, setCredentials] = useState({'email':"",'password':""});

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
    const formHandler = async(e) => {
        e.preventDefault()
        console.log(credentials);
        const response = await axios.post('http://localhost:5000/users/login/',{user:credentials})
        setCookies('token', response.data.accessToken)
    }
    useEffect(() => {
        console.log(credentials);
    }, [credentials])
    //Модальное окно логина
    const loginModal = (
        <div className='window'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1><u>Login</u></h1>
                </div>
                <div className='registerDivWindow'>
                    <h1>Register</h1>
                </div>
            </div>
            <div onSubmit={formHandler} className='formLogin'>
                <form>
                    <input className='input-mail' type='text' placeholder='E-Mail' onChange={e=>{setCredentials({...credentials,email:e.target.value})}}></input>
                    <input className='input-password' type='password' placeholder='Password' onChange={e=>{setCredentials({...credentials,password:e.target.value})}}></input>
                    <button className='login-button'>Login</button>
                </form>
            </div>
        </div>
    )
    //Модальное окно регистрации
    const registerModal = (
        <div className='window'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1 className='active'>Login</h1>
                </div>
                <div className='registerDivWindow'>
                    <h1><u>Register</u></h1>
                </div>
            </div>
            <div className='formRegister'>
                <form>
                    <input className='input-name-register' type='text' placeholder='Name'></input>
                    <input className='input-mail-register' type='text' placeholder='E-Mail'></input>
                    <input className='input-mail-register' type='tel' placeholder='Phone'></input>
                    <input className='input-password-register' type='password' placeholder='Password'></input>
                    <input className='input-password-again' type='password' placeholder='Confirm password'></input>
                    <button className='register-button' type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
    return (
        <header>
            <h1><a href='/'>AutoKaup24</a></h1>
            <ul>
                <li>
                    <a href='/placeAnAd'>Create Ad</a>
                </li>
                <li>
                    <a href='/favourites'>Favorites</a>
                </li>
            </ul>
            <ul className='login-register'>
                <li>
                    <button onClick={openLoginModal}>Login</button>
                </li>
                <Modal isOpen={modalLogin} onRequestClose={closeLoginModal}>
                    {loginModal}
                </Modal>
                <li>
                    <button onClick={openRegisterModal}>Register</button>
                </li>
                <Modal isOpen={modalIsOpen} onRequestClose={closeRegisterModal}>
                    {registerModal}
                </Modal>
            </ul>
        </header>
    )
}

export default Header
