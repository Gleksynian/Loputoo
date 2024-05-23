import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import axios from 'axios';
import { base_url, base_url2 } from '../config.js';
import moment from 'moment';

function Main() {
    const [select, setSelect] = useState("#00000050");
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [cities, setCities] = useState([]);
    const [currentBrand, setCurrentBrand] = useState(-1);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});
    const [sortOrder, setSortOrder] = useState('');

    const handler = (e) => {
        if (e.target.value === 0) {
            e.target.style.color = "#00000050";
        } else {
            e.target.style.color = "#000";
        }
    };

    const getCities = async () => {
        try {
            const response = await axios.get(base_url + '/cities');
            if (Array.isArray(response.data)) {
                setCities(response.data);
            } else {
                console.error("Cities response is not an array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const getBrands = async () => {
        try {
            const response = await axios.get(base_url + '/brands');
            if (Array.isArray(response.data)) {
                setBrands(response.data);
            } else {
                console.error("Brands response is not an array:", response.data);
            }

            const modelsResponse = await axios.get(base_url + '/models');
            if (Array.isArray(modelsResponse.data)) {
                setModels(modelsResponse.data);
            } else {
                console.error("Models response is not an array:", modelsResponse.data);
            }

            const carsResponse = await axios.get(base_url + '/cars');
            if (Array.isArray(carsResponse.data)) {
                setCars(carsResponse.data);
            } else {
                console.error("Cars response is not an array:", carsResponse.data);
            }

            setLoading(true);
        } catch (error) {
            console.error("Error fetching brands, models, or cars:", error);
        }
    };

    useEffect(() => {
        getBrands();
        getCities();
    }, []);

    const matchesFilter = (item) => {
        if (filter.brand_id && item.Brand.id !== parseInt(filter.brand_id)) return false;
        if (filter.model_id && item.Model.id !== parseInt(filter.model_id)) return false;
        if (filter.bodyType && item.bodyType !== filter.bodyType) return false;
        if (filter.fuel && item.fuel !== filter.fuel) return false;
        if (filter.transmission && item.transmission !== filter.transmission) return false;
        if (filter.drivetrain && item.drivetrain !== filter.drivetrain) return false;
        if (filter.location && item.cityId !== parseInt(filter.location)) return false;
        if (filter.minPrice && item.price < parseInt(filter.minPrice)) return false;
        if (filter.maxPrice && item.price > parseInt(filter.maxPrice)) return false;
        if (filter.minYear && item.year < parseInt(filter.minYear)) return false;
        if (filter.maxYear && item.year > parseInt(filter.maxYear)) return false;
        if (filter.minPower && item.power < parseInt(filter.minPower)) return false;
        if (filter.maxPower && item.power > parseInt(filter.maxPower)) return false;
        if (filter.minMileage && item.mileage < parseInt(filter.minMileage)) return false;
        if (filter.maxMileage && item.mileage > parseInt(filter.maxMileage)) return false;
        return true;
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortCars = (cars) => {
        cars.sort((a, b) => {
            const isNewA = moment().diff(moment(a.createdAt), 'hours') < 6;
            const isNewB = moment().diff(moment(b.createdAt), 'hours') < 6;
            if (isNewA && !isNewB) return -1;
            if (!isNewA && isNewB) return 1;
            return 0;
        });
        switch (sortOrder) {
            case 'year-asc':
                return cars.sort((a, b) => a.year - b.year);
            case 'year-desc':
                return cars.sort((a, b) => b.year - a.year);
            case 'mileage-asc':
                return cars.sort((a, b) => a.mileage - b.mileage);
            case 'mileage-desc':
                return cars.sort((a, b) => b.mileage - a.mileage);
            case 'power-asc':
                return cars.sort((a, b) => a.power - b.power);
            case 'power-desc':
                return cars.sort((a, b) => b.power - a.power);
            case 'price-asc':
                return cars.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return cars.sort((a, b) => b.price - a.price);
            default:
                return cars;
        }
    };
    const clearFilters = () => {
        setFilter({});
        setCurrentBrand(-1);
        const selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
            select.selectedIndex = 0;
            select.style.color = "#00000050";
        });
    };

    const filteredCars = sortCars(cars.filter(matchesFilter));

    return (
        <>
            {loading ? (
                <>
                    <Header />
                    <div className='main-div  fade-in'>
                        <aside className='search-aside'>
                            <form>
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setCurrentBrand(e.target.selectedOptions[0].value);
                                        setFilter({ ...filter, brand_id: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}>
                                    <option hidden value={0}>Brand</option>
                                    {brands.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, model_id: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}>
                                    <option hidden>Model</option>
                                    {models.filter(item => item.brand_id === parseInt(currentBrand)).map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, bodyType: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}>
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
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, fuel: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}
                                    className='fuel-select'>
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
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, transmission: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}>
                                    <option hidden>Transmission</option>
                                    <option>Automatic</option>
                                    <option>Manual</option>
                                    <option>Semi-automatic</option>
                                </select>
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, drivetrain: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }}>
                                    <option hidden>Drivetrain</option>
                                    <option>Rear-wheel drive</option>
                                    <option>Front-wheel drive</option>
                                    <option>Four-wheel drive</option>
                                </select>
                                <select
                                    onChange={(e) => {
                                        handler(e);
                                        setFilter({ ...filter, location: e.target.selectedOptions[0].value });
                                    }}
                                    style={{ color: select }} В>
                                    <option hidden>Location</option>
                                    <option value={1}>All</option>
                                    {cities.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={clearFilters}>Clear Filters</button>
                            </form>
                        </aside>
                        <div>
                            <div className='top-panel'>
                                <p>Found: {filteredCars.length}</p>
                                <select className='sort-select' onChange={handleSortChange}>
                                    <option value=''>Sort</option>
                                    <option value='year-asc'>Year (Ascending)</option>
                                    <option value='year-desc'>Year (Descending)</option>
                                    <option value='mileage-asc'>Mileage (Ascending)</option>
                                    <option value='mileage-desc'>Mileage (Descending)</option>
                                    <option value='power-asc'>Power (Ascending)</option>
                                    <option value='power-desc'>Power (Descending)</option>
                                    <option value='price-asc'>Price (Ascending)</option>
                                    <option value='price-desc'>Price (Descending)</option>
                                </select>
                            </div>
                            <div className='cardList'>
                                {filteredCars.map((item, index) => (
                                    <a href={'/cardetails/' + item.id} key={index}>
                                        <div className='card'>
                                            {moment().diff(moment(item.createdAt), 'hours') < 6 && (
                                                <span className='newOffer'>New offer</span>
                                            )}
                                            <img src={base_url2 + '/' + item.image} alt='car' />
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
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default Main;