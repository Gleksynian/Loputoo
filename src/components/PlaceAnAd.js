import React, { useState } from 'react'
import Header from './Header.js'
import '../placeAnAd.css'
import photoAdForm from '../assets/photoAdForm.svg'


function PlaceAnAd() {
    const [select, setSelect] = useState("#00000050");
    const handler = (e) => {
        console.log(e);
        if (e.target.value == 0) {
            e.target.style.color = "#00000050"
        } else {
            e.target.style.color = "#000"
        }
    }
    return (
        <>
            <div>
                <Header />
                <div className='placeAdDiv'>
                    <form className='adForm'>
                        <div className='divAd'>
                            <div className='formDivAd'>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='brand-select'>
                                    <option hidden value={0}>Марка</option>
                                    <option value={1}>BMW</option>
                                    <option value={2}>Volkswagen</option>
                                    <option value={3}>Audi</option>
                                </select>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='model-select'>
                                    <option hidden>Модель</option>
                                    <option>530</option>
                                    <option>Golf</option>
                                    <option>R8</option>
                                </select>
                                <div className='ad-input'>
                                    <label>Год</label>
                                    <div>
                                        <input type='number' min={0}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label>Цена</label>
                                    <div>
                                        <input type='number' min={0}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='powerLabel'>Мощность (кВ)</label>
                                    <div>
                                        <input type='number' min={0}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='mileage-label'>Пробег (км)</label>
                                    <div>
                                        <input type='number' min={0}></input>
                                    </div>
                                </div>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='fuel-select'>
                                    <option hidden>Топливо</option>
                                    <option>Дизель</option>
                                    <option>Бензин</option>
                                    <option>Электричество</option>
                                </select>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='gear-select'>
                                    <option hidden>КПП</option>
                                    <option>Автомат</option>
                                    <option>Механическая коробка передач</option>
                                </select>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='transmission-select'>
                                    <option hidden>Ведущие колеса</option>
                                    <option>Задние ведущие</option>
                                    <option>Передние ведущие</option>
                                    <option>4x4</option>
                                </select>
                                <select onChange={(e) => { handler(e) }} style={{ color: select }} className='location-select'>
                                    <option hidden>Местоположение</option>
                                    <option>Кохтла-Ярве</option>
                                    <option>Таллинн</option>
                                    <option>Тарту</option>
                                </select>
                            </div>
                            <div>
                                <div className='additionalInfoAd'>
                                    <label>Дополнительная информация</label>
                                    <textarea className='additionalInputAd' type='text'></textarea>
                                </div>
                                <div className='mainPhotoAd'>
                                    <label>Главная фотография</label>
                                    <label className='adPhotoLabel'>
                                        <img className='image-photo' src={photoAdForm} />
                                        <input type='file' hidden/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className='btn-submit-ad' type='submit'>Подтвердить</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default PlaceAnAd