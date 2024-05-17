import React, { useEffect, useState } from 'react'
import Header from './Header.js';
import axios from 'axios';
import { base_url, base_url2 } from '../config.js';

function Main() {
    const [select, setSelect] = useState("#00000050");

    const [brands, setBrands] = useState([])

    const [models, setModels] = useState([])

    const [cities, setCities] = useState([])

    const [currentBrand, setCurrentBrand] = useState(-1)

    const [cars, setCars] = useState([])

    const [loading, setLoading] = useState(false)

    const [filter, setFilter] = useState({

    })

    const handler = (e) => {
        console.log(e);
        if (e.target.value === 0) {
            e.target.style.color = "#00000050"
        } else {
            e.target.style.color = "#000"
        }
    }

    const getCities = async () => {
        const response = await axios.get(base_url + '/cities').then(async (data) => {
            setCities(data.data)
        })
    }

    const getBrands = async () => {
        const response = await axios.get(base_url + '/brands').then(async (data) => {
            setBrands(data.data)
            await axios.get(base_url + '/models').then(async (data) => {
                setModels(data.data)
                await axios.get(base_url + '/cars').then(async (data) => {
                    setCars(data.data)
                    setLoading(true)
                })
            })
        })
    }
    useEffect(() => {
        getBrands()
        getCities()
    }, [])

    return (
        <>
            {(loading) ? (<>
                <Header />
                <div className='main-div'>
                    <aside className='search-aside'>
                        <form>
                            <select onChange={(e) => {
                                handler(e);
                                setCurrentBrand(e.target.selectedOptions[0].value);
                                setFilter({ ...filter, brand_id: e.target.selectedOptions[0].value })
                            }} style={{ color: select }}>
                                <option hidden value={0}>Brand</option>
                                {brands.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })}
                            </select>
                            <select onChange={(e) => { handler(e); setFilter({ ...filter, model_id: e.target.selectedOptions[0].value }) }} style={{ color: select }}>
                                <option hidden>Model</option>
                                {models.filter(item => {
                                    if (item.brand_id === parseInt(currentBrand)) {
                                        return true
                                    }
                                }).map((item, index) => {
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })}
                            </select>
                            <select onChange={(e) => { handler(e); setFilter({ ...filter, bodyType: e.target.selectedOptions[0].value }) }} style={{ color: select }}>
                                <option hidden>Body type</option>
                                <option value={1}>All</option>
                                <option>Touring</option>
                                <option>Sedan</option>
                                <option>Hatchback</option>
                                <option>Minivan</option>
                                <option>Coupe</option>
                                <option>Cabriolet</option>
                                <option>Pickup</option>
                                <option>Limousine</option>
                            </select>
                            <div className='range-input'>
                                <label>Year</label>
                                <div>
                                    <input onChange={(e) => setFilter({ ...filter, minYear: e.target.value })} type='number' min={0}></input>
                                    -
                                    <input onChange={(e) => setFilter({ ...filter, maxYear: e.target.value })} type='number'></input>
                                </div>
                            </div>
                            <div className='range-input'>
                                <label>Price</label>
                                <div>
                                    <input onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })} type='number' min={0}></input>
                                    -
                                    <input onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })} type='number'></input>
                                </div>
                            </div>
                            <div className='range-input'>
                                <label>Power (kW)</label>
                                <div>
                                    <input onChange={(e) => setFilter({ ...filter, minPower: e.target.value })} type='number' min={0}></input>
                                    -
                                    <input onChange={(e) => setFilter({ ...filter, maxPower: e.target.value })} type='number'></input>
                                </div>
                            </div>
                            <div className='range-input'>
                                <label>Mileage (km)</label>
                                <div>
                                    <input onChange={(e) => setFilter({ ...filter, minMileage: e.target.value })} type='number' min={0}></input>
                                    -
                                    <input onChange={(e) => setFilter({ ...filter, maxMileage: e.target.value })} type='number'></input>
                                </div>
                            </div>
                            <select onChange={(e) => { handler(e); setFilter({ ...filter, fuel: e.target.selectedOptions[0].value }) }} style={{ color: select }} className='fuel-select'>
                                <option hidden>Fuel</option>
                                <option value={1}>All</option>
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
                            <select contentEditable='false' spellCheck='false' onChange={(e) => { handler(e); setFilter({ ...filter, transmission: e.target.selectedOptions[0].value }) }} style={{ color: select }}>
                                <option hidden>Transmission</option>
                                <option value={1}>All</option>
                                <option>Automatic</option>
                                <option>Manual</option>
                                <option>Semi-automatic</option>
                            </select>
                            <select onChange={(e) => { handler(e); setFilter({ ...filter, drivetrain: e.target.selectedOptions[0].value }) }} style={{ color: select }}>
                                <option hidden>Drivetrain</option>
                                <option value={1}>All</option>
                                <option>Rear-wheel drive</option>
                                <option>Front-wheel drive</option>
                                <option>Four-wheel drive</option>
                            </select>
                            <select onChange={(e) => {
                                handler(e);
                                setCities(e.target.selectedOptions[0].value);
                                setFilter({ ...filter, location: e.target.selectedOptions[0].value })
                            }} style={{ color: select }}>
                                <option hidden>Location</option>
                                <option value={1}>All</option>
                                {cities.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })}
                            </select>
                            <button type='submit'>Search</button>
                        </form>
                    </aside>
                    <div>
                        <div className='top-panel'>
                            <p>Found:</p>
                            <select className='sort-select'>
                                <option>Sort</option>
                            </select>
                        </div>
                        <div className='cardList'>
                            {cars.filter(item => {
                                if (item.Brand.id === parseInt(filter.brand_id)
                                    && item.Model.id === parseInt(filter.model_id)
                                    && item.bodyType === filter.bodyType
                                    && item.fuel === filter.fuel
                                    && item.transmission === filter.transmission
                                    && item.drivetrain === filter.drivetrain
                                    && item.cityId === parseInt(filter.location)
                                    && item.price >= parseInt(filter.minPrice)
                                    && item.price <= parseInt(filter.maxPrice)
                                    && item.year >= parseInt(filter.minYear)
                                    && item.year <= parseInt(filter.maxYear)
                                    && item.power >= parseInt(filter.minPower)
                                    && item.power <= parseInt(filter.maxPower)
                                    && item.mileage >= parseInt(filter.minMileage)
                                    && item.mileage <= parseInt(filter.maxMileage)) { return true }
                            }).map((item, index) => {
                                return (
                                    <a href={'/cardetails/' + item.id}>
                                        <div className='card'>
                                            <span className='newOffer'>
                                                New offer
                                            </span>
                                            <img style={{ maxWidth: "444px", maxHeight: "296px", objectFit: "contain" }} src={base_url2 + '/' + item.image} alt='car' />
                                            <div>
                                                <div className='mainInfo'>
                                                    <p>{item.Brand.name + ' ' + item.Model.name + ' ' + item.engine + ' ' + item.power + 'kW'} { }</p>
                                                    <p>{item.price + ' €'}</p>
                                                    <p>{item.year}</p>
                                                </div>
                                                <div className='badges'>
                                                    <span>{item.mileage}</span>
                                                    <span>{item.fuel}</span>
                                                    <span>{item.transmission}</span>
                                                    <span>{item.bodyType}</span>
                                                    <span>{item.drivetrain}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div></>
            ) : (<></>)}
        </>
    )
}

export default Main