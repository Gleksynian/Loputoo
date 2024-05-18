import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { base_url } from '../config.js';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies();
    const [credentials, setCredentials] = useState({ 'email': "", 'password': "" });
    const [registerCredentials, setRegisterCredentials] = useState({ 'name': "", "email": "", "phone": "", "password": "", "confirmPassword": "" });
    const navigate = useNavigate();

    const openLoginModal = () => {
        setModalLogin(true);
    };

    const closeLoginModal = () => {
        setModalLogin(false);
    };

    const openRegisterModal = () => {
        setModalRegister(true);
    };

    const closeRegisterModal = () => {
        setModalRegister(false);
    };

    const formHandler = async (e) => {
        e.preventDefault()
        const response = await axios.post(base_url + '/users/login/', { user: credentials })
        setCookies('token', response.data.accessToken)
        setCookies('currentUserId', response.data.existUser)
    }

    const exitConfirm = () => {
        removeCookie('token', { path: '/' });
        removeCookie('currentUserId', { path: '/' });
        navigate('/');
    };

    const formRegHandler = async (e) => {
        e.preventDefault()
        const responseRegister = await axios.post(base_url + '/users/register/', { user: registerCredentials })
        const responseLogin = await axios.post(base_url + '/users/login/', { user: registerCredentials })
        setCookies('token', responseLogin.data.accessToken)
        setCookies('currentUserId', responseLogin.data.existUser);
    }

    const registerModal = (
        <div className='window-register'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1 className='active'>Login</h1>
                </div>
                <div className='registerDivWindow'>
                    <h1>
                        <u>Register</u>
                    </h1>
                </div>
            </div>
            <div className='formRegister'>
                <form onSubmit={formRegHandler}>
                    <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, name: e.target.value }) }} className='input-name-register' type='text' placeholder='Name'></input>
                    <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, email: e.target.value }) }} className='input-mail-register' type='text' placeholder='E-Mail'></input>
                    <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, phone: e.target.value }) }} className='input-mail-register' type='tel' placeholder='Phone'></input>
                    <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, password: e.target.value }) }} className='input-password-register' type='password' minLength={8} placeholder='Password'></input>
                    <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, confirmPassword: e.target.value }) }} className='input-password-again' type='password' min={8} placeholder='Confirm password'></input>
                    <button className='register-button' type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
    useEffect(() => {
        // console.log(registerCredentials);
    }, [registerCredentials])
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
                    <input className='input-mail' type='text' placeholder='E-Mail' onChange={e => { setCredentials({ ...credentials, email: e.target.value }) }}></input>
                    <input className='input-password' type='password' minLength={8} placeholder='Password' onChange={e => { setCredentials({ ...credentials, password: e.target.value }) }}></input>
                    <button className='login-button' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );

    return (
        <header>
            <h1><Link to="/">AutoKaup24</Link></h1>
            <ul>
                {cookies.token && (
                    <li>
                        <Link to="/placeAnAd">Create Ad</Link>
                    </li>
                )}
                {cookies.token && (
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                )}
            </ul>
            <ul className='login-register'>
                {cookies.token ? (
                    <>
                        <li>
                            <button onClick={(exitConfirm)}>Logout</button>
                        </li>
                        <li style={{ border: 'none' }}>
                            <button><a style={{ textDecoration: "none", color: '#fff' }} href={'/profile/' + cookies.currentUserId.id}>{cookies.currentUserId.name}</a></button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={openLoginModal}>Login</button>
                            <Modal className='modalLoginStyle fade-in-reg-log' isOpen={modalLogin} onRequestClose={closeLoginModal}>
                                {loginModal}
                            </Modal>
                        </li>
                        <li>
                            <button onClick={openRegisterModal}>Register</button>
                            <Modal className='modalRegisterStyle fade-in-reg-log' isOpen={modalRegister} onRequestClose={closeRegisterModal}>
                                {registerModal}
                            </Modal>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );

}

export default Header;