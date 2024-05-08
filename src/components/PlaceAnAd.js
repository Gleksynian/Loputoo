import React, { useRef, useState } from 'react'
import Header from './Header.js'
import '../placeAnAd.css'
import photoAdForm from '../assets/photoAdForm.svg'
import axios from 'axios'
import { useCookies } from 'react-cookie'


function PlaceAnAd() {
    const [select, setSelect] = useState("#00000050");
    const [car, setCar] = useState({});
    const [cookies, setCookies] = useCookies()
    const fileRef = useRef(null)
    const handler = (e) => {
        if (e.target.value == 0) {
            e.target.style.color = "#00000050"
        } else {
            e.target.style.color = "#000"
        }
    }
    const formHandler = async (e) => {
        e.preventDefault();
        // const res = await axios.get('http://localhost:5000/test/')
        // console.log(res);
        var form = new FormData()
        form.append('car', JSON.stringify(car))
        form.append('img', fileRef.current.files[0])
        await axios.post('http://localhost:5000/cars/', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: cookies.token
            }
        })
    }
    const brandHandler = (e) => {
        setCar({...car, brand:e.target.value})
    }
    const modelHandler = (e) => {
        setCar({...car, model:e.target.value})
    }
    const yearHandler = (e) => {
        setCar({...car, year:e.target.value})
    }
    const priceHandler = (e) => {
        setCar({...car, price:e.target.value})
    }
    const powerHandler = (e) => {
        setCar({...car, power:e.target.value})
    }
    const mileageHandler = (e) => {
        setCar({...car, mileage:e.target.value})
    }
    const fuelHandler = (e) => {
        setCar({...car, fuel:e.target.value})
    }
    const transmissionHandler = (e) => {
        setCar({...car, transmission:e.target.value})
    }
    const drivetrainHandler = (e) => {
        setCar({...car, drivetrain:e.target.value})
    }
    const locationHandler = (e) => {
        setCar({...car, location:e.target.value})
    }
    const additionalInfoHandler = (e) => {
        setCar({...car, additionalInfo:e.target.value})
    }
    // const imageHandler = (e) => {
    //     setCar({...car, imgae:e.target.value})
    // }
    return (
        <>
            <div>
                <Header />
                <div className='placeAdDiv'>
                    <form className='adForm' onSubmit={(e)=>{formHandler(e)}} encType='multipart/form-data'>
                        <div className='divAd'>
                            <div className='formDivAd'>
                                <select onChange={(e) => { handler(e);brandHandler(e) }} style={{ color: select }} className='brand-select'>
                                    <option hidden value={0}>Марка</option>
                                    <option value={1}>BMW</option>
                                    <option value={2}>Volkswagen</option>
                                    <option value={3}>Audi</option>
                                </select>
                                <select onChange={(e) => { handler(e);modelHandler(e) }} style={{ color: select }} className='model-select'>
                                    <option hidden>Модель</option>
                                    <option>530</option>
                                    <option>Golf</option>
                                    <option>R8</option>
                                </select>
                                <div className='ad-input'>
                                    <label>Год</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => {yearHandler(e)}}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label>Цена</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => {priceHandler(e)}}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='powerLabel'>Мощность (кВ)</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => {powerHandler(e)}}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='mileage-label'>Пробег (км)</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => {mileageHandler(e)}}></input>
                                    </div>
                                </div>
                                <select onChange={(e) => { handler(e); fuelHandler(e) }} style={{ color: select }} className='fuel-select'>
                                    <option hidden>Топливо</option>
                                    <option>Дизель</option>
                                    <option>Бензин</option>
                                    <option>Электричество</option>
                                </select>
                                <select onChange={(e) => { handler(e); transmissionHandler(e) }} style={{ color: select }} className='gear-select'>
                                    <option hidden>КПП</option>
                                    <option>Автомат</option>
                                    <option>Механическая коробка передач</option>
                                </select>
                                <select onChange={(e) => { handler(e); drivetrainHandler(e) }} style={{ color: select }} className='transmission-select'>
                                    <option hidden>Ведущие колеса</option>
                                    <option>Задние ведущие</option>
                                    <option>Передние ведущие</option>
                                    <option>4x4</option>
                                </select>
                                <select onChange={(e) => { handler(e);locationHandler(e) }} style={{ color: select }} className='location-select'>
                                    <option hidden>Местоположение</option>
                                    <option>Кохтла-Ярве</option>
                                    <option>Таллинн</option>
                                    <option>Тарту</option>
                                </select>
                            </div>
                            <div>
                                <div className='additionalInfoAd'>
                                    <label>Дополнительная информация</label>
                                    <textarea onChange={(e) => { additionalInfoHandler(e) }} className='additionalInputAd' type='text'></textarea>
                                </div>
                                <div className='mainPhotoAd'>
                                    <label>Главная фотография</label>
                                    <label className='adPhotoLabel'>
                                        <img className='image-photo' src={photoAdForm} />
                                        <input type='file' name='car-image' ref={fileRef} hidden />
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