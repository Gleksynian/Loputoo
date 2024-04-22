import React, { useState } from 'react'
import car from "../assets/car.png"
import Header from './Header.js';

function Main() {
    const [select, setSelect] = useState("#00000050");
    const handler = (e) => {
        console.log(e);
        if (e.target.value === 0) {
            e.target.style.color = "#00000050"
        } else {
            e.target.style.color = "#000"
        }
    }

    return (
        <>
            <Header />
            <div className='main-div'>
                <aside className='search-aside'>
                    <form>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden value={0}>Марка</option>
                            <option value={1}>BMW</option>
                            <option value={2}>Volkswagen</option>
                            <option value={3}>Audi</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option>Модель</option>
                            <option>530</option>
                            <option>Golf</option>
                            <option>R8</option>
                        </select>
                        <div className='range-input'>
                            <label>Год</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Цена</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Мощность (кВ)</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Пробег (км)</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }} className='fuel-select'>
                            <option>Топливо</option>
                            <option>Дизель</option>
                            <option>Бензин</option>
                            <option>Электричество</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option>КПП</option>
                            <option>Автомат</option>
                            <option>Механическая коробка передач</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option>Ведущие колеса</option>
                            <option>Задние ведущие</option>
                            <option>Передние ведущие</option>
                            <option>4x4</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option>Местоположение</option>
                            <option>Кохтла-Ярве</option>
                            <option>Таллинн</option>
                            <option>Тарту</option>
                        </select>
                        <button type='submit'>Искать</button>
                    </form>
                </aside>
                <div>
                    <div className='top-panel'>
                        <p>Найдено:</p>
                        <select className='sort-select'>
                            <option>Сортировка</option>
                            <option>Volkswagen</option>
                            <option>Audi</option>
                        </select>
                    </div>
                    <div className='cardList'>
                        <div className='card'>
                            <span className='newOffer'>
                                Новое предложение
                            </span>
                            <img src={car} alt='car'/>
                            <div>
                                <div className='mainInfo'>
                                    <p>Skoda Superb</p>
                                    <p>13500e</p>
                                    <p>2017</p>
                                </div>
                                <div className='badges'>
                                    <span>188500km</span>
                                    <span>Diesel</span>
                                    <span>Automat</span>
                                    <span>Avant</span>
                                    <span>Foreground</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardList'>
                        <a href='/cardetails/2'>
                            <div className='card'>
                                <span className='newOffer'>
                                    Новое предложение
                                </span>
                                <img src={car} alt='car' />
                                <div>
                                    <div className='mainInfo'>
                                        <p>Skoda Superb</p>
                                        <p>13500e</p>
                                        <p>2017</p>
                                    </div>
                                    <div className='badges'>
                                        <span>188500km</span>
                                        <span>Diesel</span>
                                        <span>Automat</span>
                                        <span>Avant</span>
                                        <span>Foreground</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main