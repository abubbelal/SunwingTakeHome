// LanguageProvider.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};


export const LanguageProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language: urlLanguage } = useParams();
    const [language, setLanguage] = useState(urlLanguage || 'en');

    useEffect(() => {
        if (urlLanguage && ['en', 'fr'].includes(urlLanguage)) {
            setLanguage(urlLanguage);
        }
    }, [urlLanguage]);

    useEffect(() => {
        // update language state and keep url in sync
        if (urlLanguage !== language) {
            let path = location.pathname;
            const newPath = path.startsWith(`/${urlLanguage}`)
                ? path.replace(`/${urlLanguage}`, `/${language}`)
                : `/${language}${path}`;
            navigate(newPath, { replace: true });
        }
    }, [language, urlLanguage, navigate, location.pathname]);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'fr' : 'en';
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};