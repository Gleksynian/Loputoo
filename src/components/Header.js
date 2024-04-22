import React, { useState } from 'react';
import Modal from 'react-modal';
import '../App.css'

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);


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
                <form>
                    <input className='input-name-register' type='text' placeholder='Имя'></input>
                    <input className='input-mail-register' type='text' placeholder='E-Mail'></input>
                    <input className='input-password-register' type='password' placeholder='Пароль'></input>
                    <input className='input-password-again' type='password' placeholder='Подтвердите пароль'></input>
                    <button className='register-button'>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
    return (
        <header>
            <h1><a href='/'>AutoKaup24</a></h1>
            <ul>
                <li>Создать объявление</li>
                <li>Избранное</li>

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
