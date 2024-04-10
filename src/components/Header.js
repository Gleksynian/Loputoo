import React from 'react';
import '../App.css'

function Header() {
    return (
        <header>
            <h1>AutoKaup24</h1>
           <ul>
            <li>Создать объявление</li>
            <li>Избранное</li>
            
           </ul>
           <ul className='login-register'>
            <li>Войти</li>
            <li>Зарегистрироваться</li>
           </ul>
        </header>
    )
}

export default Header
