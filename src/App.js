import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Main from './components/Main'
import Details from './components/Details'
import PlaceAnAd from './components/PlaceAnAd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './components/Favorites'
import Profile from './components/Profile'

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/cardetails/:id" element={<Details />} />
                    <Route path="/placeAnAd" element={<PlaceAnAd />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Router>
        </>
    )
}

export default App