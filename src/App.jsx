import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Banner from "./Components/Banner";
import Excursion from "./Pages/Excursion";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
// import SyncLanguageUrl from "./Hooks/SyncLanguageUrl";
import { useLanguage } from "./Context/LanguageContext";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/en" />} />
            <Route path="/:language" element={<Home />} />
            <Route path="/:language/excursion/:country/:destination" element={<Excursion />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default App;