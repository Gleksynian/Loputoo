import React from 'react'

function Main() {
    return (
        <div className='main-div'>
            <aside className='search-aside'>
                <form>
                    <select>
                        <option>Марка</option>
                        <option>BMW</option>
                        <option>Volkswagen</option>
                        <option>Audi</option>
                    </select>
                    <select>
                        <option>Модель</option>
                        <option>530</option>
                        <option>Golf</option>
                        <option>R8</option>
                    </select>
                    <div className='range-input'>
                        <label>Год</label>
                        <div>
                            <input type='number'></input>
                            -
                            <input type='number'></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Цена</label>
                        <div>
                            <input type='number'></input>
                            -
                            <input type='number'></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Мощность (кВ)</label>
                        <div>
                            <input type='number'></input>
                            -
                            <input type='number'></input>
                        </div>
                    </div>
                    <div className='range-input'>
                        <label>Пробег (км)</label>
                        <div>
                            <input type='number'></input>
                            -
                            <input type='number'></input>
                        </div>
                    </div>
                    <select className='fuel-select'>
                        <option>Топливо</option>
                        <option>Дизель</option>
                        <option>Бензин</option>
                        <option>Электричество</option>
                    </select>
                    <select>
                        <option>КПП</option>
                        <option>Автомат</option>
                        <option>Механическая коробка передач</option>
                    </select>
                    <select>
                        <option>Ведущие колеса</option>
                        <option>Задние ведущие</option>
                        <option>Передние ведущие</option>
                        <option>4x4</option>
                    </select>
                    <select>
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
            </div>
        </div>
    )
}

export default Main