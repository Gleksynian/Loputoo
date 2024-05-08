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
                            <option hidden value={0}>Brand</option>
                            <option value={1}>BMW</option>
                            <option value={2}>Volkswagen</option>
                            <option value={3}>Audi</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden>Model</option>
                            <option>530</option>
                            <option>Golf</option>
                            <option>R8</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden>Body type</option>
                            <option>Touring</option>
                            <option>Sedan</option>
                            <option>Hatchback</option>
                        </select>
                        <div className='range-input'>
                            <label>Year</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Price</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Power (kW)</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <div className='range-input'>
                            <label>Mileage (kM)</label>
                            <div>
                                <input type='number' min={0}></input>
                                -
                                <input type='number'></input>
                            </div>
                        </div>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }} className='fuel-select'>
                            <option hidden>Fuel</option>
                            <option>Diesel</option>
                            <option>Petrol</option>
                            <option>Электричество</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden>Transmission</option>
                            <option>Automatic</option>
                            <option>Механическая коробка передач</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden>Drivetrain</option>
                            <option>Rear-wheel drive</option>
                            <option>Front-wheel drive</option>
                            <option>4x4</option>
                        </select>
                        <select onChange={(e) => { handler(e) }} style={{ color: select }}>
                            <option hidden>Location</option>
                            <option>Кохтла-Ярве</option>
                            <option>Таллинн</option>
                            <option>Тарту</option>
                        </select>
                        <button type='submit'>Search</button>
                    </form>
                </aside>
                <div>
                    <div className='top-panel'>
                        <p>Найдено:</p>
                        <select className='sort-select'>
                            <option>Sort</option>
                        </select>
                    </div>
                    <div className='cardList'>
                        <a href='/cardetails/1'>
                            <div className='card'>
                                <span className='newOffer'>
                                    New offer
                                </span>
                                <img src={car} alt='car' />
                                <div>
                                    <div className='mainInfo'>
                                        <p>Skoda Superb</p>
                                        <p>13500 €</p>
                                        <p>2017</p>
                                    </div>
                                    <div className='badges'>
                                        <span>188500km</span>
                                        <span>Diesel</span>
                                        <span>Automatic</span>
                                        <span>Touring</span>
                                        <span>Front-wheel drive</span>
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