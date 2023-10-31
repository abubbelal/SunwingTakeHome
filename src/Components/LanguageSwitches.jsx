import { useLanguage } from "../Context/LanguageContext";
import "./language-switcher.css"

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer gap-1 text-white text-base font-normal font-ptsans">
                    <input
                        type="radio"
                        name="language"
                        value="en"
                        checked={language === 'en'}
                        onChange={toggleLanguage}
                        className="hidden"
                    />
                    <span className="relative w-4 h-4 border border-white rounded-full radio"></span>
                    English
                </label>
                <label className="flex items-center cursor-pointer gap-1 text-white text-base font-normal font-ptsans">
                    <input
                        type="radio"
                        name="language"
                        value="fr"
                        checked={language === 'fr'}
                        onChange={toggleLanguage}
                        className="hidden"
                    />
                    <span className="relative w-4 h-4 border border-white rounded-full radio"></span>
                    French
                </label>
            </div>
        </div>
    )
}


export default LanguageSwitcher;