import React from 'react'

function Main() {
    return (
        <div className='main-div'>
            <aside className='search-aside'>
                <form>
                    <select>
                        <option>BMW</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                    <select>
                        <option>530</option>
                        <option>Golf</option>
                        <option>R8</option>
                    </select>
                    <div className='range-input'>
                        <label>Год</label>
                        <div>
                            <input></input>
                            -
                            <input></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Цена</label>
                        <div>
                            <input></input>
                            -
                            <input></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Мощность (кВ)</label>
                        <div>
                            <input></input>
                            -
                            <input></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Пробег (км)</label>
                        <div>
                            <input></input>
                            -
                            <input></input>
                        </div>
                    </div>
                    <select className='sosi'>
                        <option>Топливо</option>
                        <option>Дизель</option>
                        <option>Бензин</option>
                        <option>Электричество</option>
                    </select>
                    <select>
                        <option>BMW</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                    <select>
                        <option>BMW</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                    <select>
                        <option>BMW</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                    <button type='submit'>Искать</button>
                </form>
            </aside>
            <div>
                <div className='top-panel'>
                    <p>Найдено:</p>
                    <select>
                        <option>Сортировка</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Main