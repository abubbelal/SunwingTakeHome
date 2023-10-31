import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from "./Context/LanguageContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Excursion from './Pages/Excursion.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route path="/:language" element={
                <LanguageProvider>
                    <Home />
                </LanguageProvider>
            } />
            <Route path="/:language/excursion/:country/:destination" element={
                <LanguageProvider>
                    <Excursion />
                </LanguageProvider>
            } />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
)