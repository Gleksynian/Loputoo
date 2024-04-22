import React from 'react'
import '../details.css'
import '../App.css'
import Header from './Header.js'
import { useParams } from 'react-router-dom'

function Details() {
    const { id } = useParams()
    return (
        <div>
            <Header />
            <div className='details'>
                <h2>Skoda</h2>
                <div>
                    <div className='carInfo'>
                        <p>Тип кузова: </p>
                        <p>Год выпуска: </p>
                        <p>Двигатель: </p>
                        <p>Топливо: </p>
                        <p>Пробег: </p>
                        <p>Привод: </p>
                        <p>Коробка передач: </p>
                        <p>Цвет: </p>
                        <p>Рег. номер: </p>
                        <p>Город: </p>
                        <p className='priceStyle'>Цена: </p>
                        <p className='additionalInfo'>Дополнительная информация</p>
                        <p className='additionalInfoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, augue non euismod condimentum, velit enim faucibus felis, nec volutpat turpis dolor ac dolor. Aliquam vel venenatis magna, quis posuere magna. Integer sollicitudin turpis quis velit fringilla iaculis. Vestibulum vitae nibh lobortis, gravida tortor sit amet, auctor dolor.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details