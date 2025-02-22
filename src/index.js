import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Parent from './common_components/parent';
import Home from './Home';
import Favorites from './Favorites';
import Details from './Details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Parent />}>
                <Route path='/Home' element={<Home />} />
                <Route path='/Favorites' element={<Favorites />} />
                <Route path='/Details' element={<Details />} />
            </Route>
        </Routes>
    </BrowserRouter>
);