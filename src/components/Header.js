import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { base_url } from '../config.js';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies(['token', 'currentUserId']);
    const [credentials, setCredentials] = useState({ 'email': "", 'password': "" });
    const [registerCredentials, setRegisterCredentials] = useState({ 'name': "", "email": "", "phone": "", "password": "", "confirmPassword": "" });
    const [loading, setLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRegisterPassword, setVisibleRegisterPassword] = useState(false);
    const [visibleRegisterConfirmPassword, setVisibleRegisterConfirmPassword] = useState(false);
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
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(base_url + '/users/login/', { user: credentials }, { withCredentials: true });
            setCookies('token', response.data.accessToken, { path: '/' });
            setCookies('currentUserId', response.data.existUser, { path: '/' });
            closeLoginModal();
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    const exitConfirm = () => {
        removeCookie('token', { path: '/' });
        removeCookie('currentUserId', { path: '/' });
        navigate('/');
    };

    const formRegHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const responseRegister = await axios.post(base_url + '/users/register/', { user: registerCredentials }, { withCredentials: true });
            const responseLogin = await axios.post(base_url + '/users/login/', { user: registerCredentials }, { withCredentials: true });
            setCookies('token', responseLogin.data.accessToken, { path: '/' });
            setCookies('currentUserId', responseLogin.data.existUser, { path: '/' });
            closeRegisterModal();
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVisiblePassword = () => {
        setVisiblePassword(!visiblePassword);
    };

    const toggleVisibleRegisterPassword = () => {
        setVisibleRegisterPassword(!visibleRegisterPassword);
    };

    const toggleVisibleRegisterConfirmPassword = () => {
        setVisibleRegisterConfirmPassword(!visibleRegisterConfirmPassword);
    };

    const regToLogHandler = () => {
            closeRegisterModal();
            openLoginModal();
    }

    const logToRegHandler = () => {
        closeLoginModal();
        openRegisterModal();
}

    const registerModal = (
        <div className='window-register'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1 className='active'><button className='regToLog-btn' onClick={regToLogHandler}>Login</button></h1>
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
                    <div className='password-input'>
                        <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, password: e.target.value }) }} className='input-password-register' type={visibleRegisterPassword ? 'text' : 'password'} minLength={8} placeholder='Password'></input>
                        <div className='eye-icon' onClick={toggleVisibleRegisterPassword} style={{ color: '#fff', fontSize: '24px', marginTop: '5px'}}>
                            {visibleRegisterPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </div>
                    </div>
                    <div className='password-input'>
                        <input onChange={(e) => { setRegisterCredentials({ ...registerCredentials, confirmPassword: e.target.value }) }} className='input-password-again' type={visibleRegisterConfirmPassword ? 'text' : 'password'} minLength={8} placeholder='Confirm password'></input>
                        <div className='eye-icon' onClick={toggleVisibleRegisterConfirmPassword} style={{ color: '#fff', fontSize: '24px', marginTop: '-10px' }}>
                            {visibleRegisterConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </div>
                    </div>
                    <button className='register-button' type='submit'>Register</button>
                </form>
            </div>
        </div>
    );

    const loginModal = (
        <div className='window'>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1><u>Login</u></h1>
                </div>
                <div className='registerDivWindow'>
                    <h1><button className='logToReg-btn' onClick={logToRegHandler}>Register</button></h1>
                </div>
            </div>
            <div onSubmit={formHandler} className='formLogin'>
                <form>
                    <input className='input-mail' type='text' placeholder='E-Mail' onChange={e => { setCredentials({ ...credentials, email: e.target.value }) }}></input>
                    <div className='password-input'>
                        <input className='input-password' type={visiblePassword ? 'text' : 'password'} minLength={8} placeholder='Password' onChange={e => { setCredentials({ ...credentials, password: e.target.value }) }}></input>
                        <div className='eye-icon' onClick={toggleVisiblePassword} style={{ color: '#fff', marginTop: '12px', fontSize: '24px' }}>
                            {visiblePassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </div>
                    </div>
                    <button className='login-button' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );

    return (
        <>
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
                                <button onClick={exitConfirm}>Logout</button>
                            </li>
                            <li style={{ border: 'none' }}>
                                <button>
                                    {cookies.currentUserId ? (
                                        <a style={{ textDecoration: 'none', color: '#fff' }} href={'/profile/' + cookies.currentUserId.id}>{cookies.currentUserId.name}</a>
                                    ) : (
                                        'Loading...'
                                    )}
                                </button>
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
        </>
    );
}

export default Header;
