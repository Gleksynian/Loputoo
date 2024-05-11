import React, { useEffect, useRef, useState } from 'react'
import Header from './Header.js'
import '../placeAnAd.css'
import photoAdForm from '../assets/photoAdForm.svg'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { base_url } from '../config.js';


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
    const [currentBrand, setCurrentBrand] = useState(-1)
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [cities, setCities] = useState([])
    const getBrands = async () => {
        const response = await axios.get(base_url + '/brands')
        setBrands(response.data)
    }
    const getModels = async () => {
        const response = await axios.get(base_url + '/models')
        setModels(response.data)
    }
    const getCities = async () => {
        const response = await axios.get(base_url + '/cities')
        setCities(response.data)
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
        setCar({ ...car, brand: e.target.value })
    }
    const modelHandler = (e) => {
        setCar({ ...car, model: e.target.value })
    }
    const bodyTypeHandler = (e) => {
        setCar({ ...car, bodyType: e.target.value })
    }
    const yearHandler = (e) => {
        setCar({ ...car, year: e.target.value })
    }
    const priceHandler = (e) => {
        setCar({ ...car, price: e.target.value })
    }
    const powerHandler = (e) => {
        setCar({ ...car, power: e.target.value })
    }
    const mileageHandler = (e) => {
        setCar({ ...car, mileage: e.target.value })
    }
    const fuelHandler = (e) => {
        setCar({ ...car, fuel: e.target.value })
    }
    const transmissionHandler = (e) => {
        setCar({ ...car, transmission: e.target.value })
    }
    const drivetrainHandler = (e) => {
        setCar({ ...car, drivetrain: e.target.value })
    }
    const locationHandler = (e) => {
        setCar({ ...car, city_id: e.target.value })
    }
    const additionalInfoHandler = (e) => {
        setCar({ ...car, description: e.target.value })
    }
    const colorHandler = (e) => {
        setCar({ ...car, color: e.target.value })
    }
    const engineHandler = (e) => {
        setCar({ ...car, engine: e.target.value })
    }
    const numberHandler = (e) => {
        setCar({ ...car, number: e.target.value })
    }
    useEffect(() => {
        getBrands()
        getModels()
        getCities()
    }, [])
    return (
        <>
            <div>
                <Header />
                <div className='placeAdDiv'>
                    <form className='adForm' onSubmit={(e) => { formHandler(e) }} encType='multipart/form-data'>
                        <div className='divAd'>
                            <div className='formDivAd'>
                                <select onChange={(e) => {
                                    handler(e);
                                    brandHandler(e);
                                    setCurrentBrand(e.target.selectedOptions[0].value)
                                }} style={{ color: select }}>
                                    <option hidden value={0}>Brand</option>
                                    {brands.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })}
                                </select>
                                <select onChange={(e) => { handler(e); modelHandler(e) }} style={{ color: select }}>
                                    <option hidden>Model</option>
                                    {models.filter(item => {
                                        if (item.brand_id === parseInt(currentBrand)) {
                                            return true
                                        }
                                    }).map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })}
                                </select>
                                <select className='bodytype-select' onChange={(e) => { handler(e); bodyTypeHandler(e) }} style={{ color: select }}>
                                    <option hidden>Body type</option>
                                    <option>Touring</option>
                                    <option>Sedan</option>
                                    <option>Hatchback</option>
                                    <option>Minivan</option>
                                    <option>Coupe</option>
                                    <option>Cabriolet</option>
                                    <option>Pickup</option>
                                    <option>Limousine</option>
                                </select>
                                <div className='ad-input'>
                                    <label>Year</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => { yearHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label>Price</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => { priceHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='powerLabel'>Power (kW)</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => { powerHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='mileage-label'>Mileage (km)</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => { mileageHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Engine</label>
                                    <div>
                                        <input type='number' min={0} onChange={(e) => { engineHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Color</label>
                                    <div>
                                        <input type='text' min={0} onChange={(e) => { colorHandler(e) }}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Reg. number</label>
                                    <div>
                                        <input type='text' min={0} onChange={(e) => { numberHandler(e) }}></input>
                                    </div>
                                </div>
                                <select onChange={(e) => { handler(e); fuelHandler(e) }} style={{ color: select }} className='fuel-select'>
                                    <option hidden>Fuel</option>
                                    <option>Дизель</option>
                                    <option>Бензин</option>
                                    <option>Электричество</option>
                                </select>
                                <select onChange={(e) => { handler(e); transmissionHandler(e) }} style={{ color: select }} className='gear-select'>
                                    <option hidden>Transmission</option>
                                    <option>Автомат</option>
                                    <option>Механическая коробка передач</option>
                                </select>
                                <select onChange={(e) => { handler(e); drivetrainHandler(e) }} style={{ color: select }} className='transmission-select'>
                                    <option hidden>Drivetrain</option>
                                    <option>Задние ведущие</option>
                                    <option>Передние ведущие</option>
                                    <option>4x4</option>
                                </select>
                                <select onChange={(e) => { handler(e); locationHandler(e) }} style={{ color: select }} className='location-select'>
                                    <option hidden>Location</option>
                                    {cities.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <div className='additionalInfoAd'>
                                    <label>Additional information</label>
                                    <textarea onChange={(e) => { additionalInfoHandler(e) }} className='additionalInputAd' type='text'></textarea>
                                </div>
                                <div className='mainPhotoAd'>
                                    <label>Main photo</label>
                                    <label className='adPhotoLabel'>
                                        <img className='image-photo' src={photoAdForm} />
                                        <input type='file' name='car-image' ref={fileRef} hidden />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className='btn-submit-ad' type='submit'>Confirm</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default PlaceAnAd