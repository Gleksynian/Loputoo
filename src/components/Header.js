import React, { useState } from 'react';
import Modal from 'react-modal';
import '../App.css'

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const modalContent = (
        <div>
            <div className='loginRegisterWindows'>
                <div className='loginDivWindow'>
                    <h1>Вход</h1>
                </div>
                <div className='registerDivWindow'>
                    <h1>Регистрация</h1>
                </div>
                <form>
                    <input placeholder='* E-Mail'></input>
                    <input placeholder='* Пароль'></input>
                </form>
                <button>Войти</button>
            </div>
        </div>
    );
    return (
        <header>
            <h1>AutoKaup24</h1>
            <ul>
                <li>Создать объявление</li>
                <li>Избранное</li>

            </ul>
            <ul className='login-register'>
                <li>
                    <button onClick={openModal}>Войти</button>
                </li>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {modalContent}
                </Modal>
                <li>Зарегистрироваться</li>
            </ul>
        </header>
    )
}

export default Header
