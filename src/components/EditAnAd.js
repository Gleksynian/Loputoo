import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.js';
import '../placeAnAd.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { base_url, base_url2 } from '../config.js';
import { useNavigate, useParams } from 'react-router-dom';

function EditAnAd() {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [select, setSelect] = useState("#00000050");
    const [car, setCar] = useState({});
    const [cookies, setCookies] = useCookies();
    const fileRef = useRef(null);
    const [currentBrand, setCurrentBrand] = useState(-1);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handler = (e) => {
        e.target.style.color = e.target.value == 0 ? "#00000050" : "#000";
    };

    const getBrands = async () => {
        const response = await axios.get(base_url + '/brands');
        setBrands(response.data);
    };

    const getModels = async () => {
        const response = await axios.get(base_url + '/models');
        setModels(response.data);
    };

    const getCities = async () => {
        const response = await axios.get(base_url + '/cities');
        setCities(response.data);
    };

    const formHandler = async (e) => {
        e.preventDefault();
        var form = new FormData();
        form.append('car', JSON.stringify(car));
        if (fileRef.current.files[0]) {
            form.append('img', fileRef.current.files[0]);
        }
        await axios.patch(base_url + '/cars/' + carId, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: cookies.token
            }
        });
        alert("Ad has been updated successfully!");
        navigate('/');
    };

    const brandHandler = (e) => {
        setCar({ ...car, brand: e.target.value });
    };

    const modelHandler = (e) => {
        setCar({ ...car, model: e.target.value });
    };

    const bodyTypeHandler = (e) => {
        setCar({ ...car, bodyType: e.target.value });
    };

    const yearHandler = (e) => {
        setCar({ ...car, year: e.target.value });
    };

    const priceHandler = (e) => {
        setCar({ ...car, price: e.target.value });
    };

    const powerHandler = (e) => {
        setCar({ ...car, power: e.target.value });
    };

    const mileageHandler = (e) => {
        setCar({ ...car, mileage: e.target.value });
    };

    const fuelHandler = (e) => {
        setCar({ ...car, fuel: e.target.value });
    };

    const transmissionHandler = (e) => {
        setCar({ ...car, transmission: e.target.value });
    };

    const drivetrainHandler = (e) => {
        setCar({ ...car, drivetrain: e.target.value });
    };

    const locationHandler = (e) => {
        setCar({ ...car, city_id: e.target.value });
    };

    const additionalInfoHandler = (e) => {
        setCar({ ...car, description: e.target.value });
    };

    const colorHandler = (e) => {
        setCar({ ...car, color: e.target.value });
    };

    const engineHandler = (e) => {
        setCar({ ...car, engine: e.target.value });
    };

    const numberHandler = (e) => {
        setCar({ ...car, number: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        getBrands();
        getModels();
        getCities();
        const getCar = async () => {
            const response = await axios.get(base_url + '/cars/' + carId, {
                headers: {
                    token: cookies.token
                }
            });
            setCar(response.data);
            setSelectedImage(base_url2 + '/' + response.data.image);
        };
        getCar();
    }, []);

    return (
        <>
            <div>
                <Header />
                <div className='placeAdDiv fade-in'>
                    <form className='adForm' onSubmit={formHandler} encType='multipart/form-data'>
                        <div className='divAd'>
                            <div className='formDivAd'>
                                <select value={car.brand || ''} className='bodytype-select' onChange={(e) => {
                                    handler(e);
                                    brandHandler(e);
                                }} style={{ color: '#000' }}>
                                    <option hidden value={0}>Brand</option>
                                    {brands.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                                <select value={car.model || ''} className='bodytype-select' onChange={(e) => {
                                    handler(e);
                                    modelHandler(e);
                                }} style={{ color: '#000' }}>
                                    <option hidden>Model</option>
                                    {models.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                                <select value={car.bodyType || ''} className='bodytype-select' onChange={(e) => {
                                    handler(e);
                                    bodyTypeHandler(e);
                                }} style={{ color: '#000' }}>
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
                                        <input type='number' value={car.year || ''} min={1925} onChange={yearHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label>Price (€)</label>
                                    <div>
                                        <input type='number' value={car.price || ''} min={1} onChange={priceHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='powerLabel'>Power (kW)</label>
                                    <div>
                                        <input type='number' value={car.power || ''} min={1} onChange={powerHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='mileage-label'>Mileage (km)</label>
                                    <div>
                                        <input type='number' value={car.mileage || ''} min={1} onChange={mileageHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Engine</label>
                                    <div>
                                        <input placeholder='ex. 1.9' type='text' value={car.engine || ''} onChange={engineHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Color</label>
                                    <div>
                                        <input type='text' value={car.color || ''} onChange={colorHandler}></input>
                                    </div>
                                </div>
                                <div className='ad-input'>
                                    <label className='engine-label'>Reg. number</label>
                                    <div>
                                        <input placeholder='ex. 123 ASD' type='text' value={car.number || ''} onChange={numberHandler}></input>
                                    </div>
                                </div>
                                <select value={car.fuel || ''} onChange={(e) => {
                                    handler(e);
                                    fuelHandler(e);
                                }} style={{ color: '#000' }} className='fuel-select'>
                                    <option hidden>Fuel</option>
                                    <option>Diesel</option>
                                    <option>Petrol</option>
                                    <option>Petrol + gas (LPG)</option>
                                    <option>Petrol + gas (CNG)</option>
                                    <option>Petrol + gas (LNG)</option>
                                    <option>Diesel + gas (LNG)</option>
                                    <option>Gas (LPG)</option>
                                    <option>Gas (CNG)</option>
                                    <option>Gas (LNG)</option>
                                    <option>Hybrid</option>
                                    <option>Hybrid (petrol / electric)</option>
                                    <option>Hybrid (diesel / electric)</option>
                                    <option>Plug-in hybrid (petrol/ electric)</option>
                                    <option>Plug-in hybrid (diesel / electric)</option>
                                    <option>Electric</option>
                                    <option>Ethanol</option>
                                </select>
                                <select value={car.transmission || ''} onChange={(e) => {
                                    handler(e);
                                    transmissionHandler(e);
                                }} style={{ color: '#000' }} className='gear-select'>
                                    <option hidden>Transmission</option>
                                    <option>Automatic</option>
                                    <option>Manual</option>
                                    <option>Semi-automatic</option>
                                </select>
                                <select value={car.drivetrain || ''} onChange={(e) => {
                                    handler(e);
                                    drivetrainHandler(e);
                                }} style={{ color: '#000' }} className='transmission-select'>
                                    <option hidden>Drivetrain</option>
                                    <option>Rear-wheel drive</option>
                                    <option>Front-wheel drive</option>
                                    <option>Four-wheel drive</option>
                                </select>
                                <select value={car.city_id || ''} onChange={(e) => {
                                    handler(e);
                                    locationHandler(e);
                                }} style={{ color: '#000' }} className='location-select'>
                                    <option hidden>Location</option>
                                    {cities.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className='additionalInfoAd'>
                                    <label>Additional information</label>
                                    <textarea value={car.description || ''} onChange={additionalInfoHandler} className='additionalInputAd' type='text'></textarea>
                                </div>
                                <div className='mainPhotoAd'>
                                    <label>Main photo</label>
                                    <label className='adPhotoLabel'>
                                        <img className='image-photo' src={selectedImage || base_url2 + '/' + car.image} alt='car' />
                                        <input type='file' name='car-image' ref={fileRef} hidden onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className='btn-submit-ad' type='submit'>Confirm</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditAnAd;
