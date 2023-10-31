import { useEffect, useRef, useState } from "react";
import Banner from "../Components/Banner";
import axios from "axios";
import { useLanguage } from "../Context/LanguageContext";
import { Link } from "react-router-dom";
import "./home.css"


const Home = () => {
    const [destinationData, setDestinationData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { language } = useLanguage();

    const loadDestination = async () => {
        const response = await axios.get(`https://hotelinfoservice.sunwingtravelgroup.com/${language}/AllHotelDestinationList`);
        const data = response.data;
        setDestinationData(data);
        setSelectedCountry(data[0].countryName)
    }

    useEffect(() => {
        loadDestination();
    }, [language])

    const handleCountryChange = (countryName) => {
        setSelectedCountry(countryName);
    };

    /**
     * I made this so the div element's for the country are accessible. Didn't want to use buttons, 
     * but buttons would've been more accessible in this situation.
     */
    const handleKeyDown = (event, countryName) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleCountryChange(countryName);
        }
    };

    const toKebabCase = (str) =>
        str
            .toLowerCase()
            .split(' ')
            .join('-');

    return (
        <div>
            <Banner />
            <div className="page-heading text-center my-10">
                <h1 className="text-sunwing-lightBlack text-4xl px-3 uppercase font-mullernarrow font-extrabold md:text-[44px]">Plan your next dream destination</h1>
            </div>
            <div className="px-3">
                <div className="country-destination-modal mx-3 flex flex-col border border-sunwing-green max-w-[1140px] md:mx-auto">
                    <div className="country-column flex flex-col">
                        <div className="column-title flex items-center justify-center py-2 px-2">
                            <h2 className="text-xl font-mullernarrow font-extrabold text-sunwing-lightBlack uppercase tracking-wide">Select Your Country</h2>
                        </div>
                        <div className="country-list w-full">
                            <ul className="overflow-y-auto flex flex-row pb-2">
                                {destinationData && destinationData.map((item, index) => (
                                    <li key={index}>
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleCountryChange(item.countryName)}
                                            onKeyDown={(event) => handleKeyDown(event, item.countryName)}
                                            className={`w-max px-2 py-1.5 ${selectedCountry === item.countryName ? 'bg-sunwing-blue text-white' : 'bg-blue-100 text-blue-700 hover:bg-sunwing-blue hover:text-white duration-150 transition-colors ease-in'}`}
                                            aria-pressed={selectedCountry === item.countryName}
                                        >
                                            {item.countryName}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="destination-column col-span-8">
                        <div className="column-title flex items-center justify-center py-2 px-2">
                            <h2 className="text-xl font-mullernarrow font-extrabold text-sunwing-lightBlack uppercase tracking-wide">Select Your Destination</h2>
                        </div>
                        <div className="flex flex-col pb-9 max-h-[550px] overflow-y-auto md:grid md:grid-cols-2 lg:grid-cols-3">
                            {selectedCountry && destinationData.find(country => country.countryName === selectedCountry)?.destinations.map((dest, index) => (
                                <article
                                    tabIndex={1}
                                    key={index}
                                    className="flex flex-col gap-2 destination-card p-4 m-4 border border-sunwing-green rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 transition-shadow duration-150 ease-in">
                                    <div className="image-container flex-grow">
                                        <img src={`/src/assets/images/cancun-min.webp`} alt={`Destination image description`} className="w-full h-full object-cover rounded" />
                                    </div>
                                    <div className="card-content flex flex-col gap-2">
                                        <h3 className="font-bold font-ptsans text-lg leading-none">{dest}</h3>
                                        <p className="text-sunwing-black leading-[22px]">{dest} is Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati exercitationem cupiditate eos quibusdam</p>
                                        <Link to={`/${language}/excursion/${toKebabCase(selectedCountry)}/${toKebabCase(dest)}`} className="text-sunwing-blue hover:underline w-max">Travel here</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;