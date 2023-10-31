import { useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";
import data from "../excursion-sample.json"
import { useLanguage } from "../Context/LanguageContext";
import Autosuggest from "react-autosuggest";
import "./excursion.css"

/**
 * I am using the Autosuggest package for the typeahead effect here. 
 * Probably not the bext one, but first one i found and went with it for now.
 * 
 * There is no loading state when data is being fetched.
 */

const Excursion = () => {
    const { language } = useLanguage();
    const { country, destination } = useParams();
    const [excursionData, setExcursionData] = useState(null)
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const loadExcursion = async () => {
        const response = await axios.get(`https://hotelinfoservice.sunwingtravelgroup.com/swg/${language}/excursionsCountryDestination/${country}/${destination}`);
        const data = response.data;
        setExcursionData(data);
        if (data.length > 0) {
            setActiveCategory(data[0].categoryName);
        }
    }


    useEffect(() => {
        loadExcursion();
    }, [language]);


    const getActiveExcursions = () => {
        if (!activeCategory) return [];

        const category = excursionData.find(cat => cat.categoryName === activeCategory);
        if (!category) return [];

        if (activeSubCategory) {
            const subCategory = category.subCategories.find(sub => sub.subCategoryName === activeSubCategory);
            return subCategory ? subCategory.excursions : [];
        }

        return category.subCategories.flatMap(sub => sub.excursions);
    };

    // Autosuggest functions
    const getSuggestions = value => {
        const activeExcursions = getActiveExcursions();
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : activeExcursions.filter(excursion =>
            excursion.excursionFullName.toLowerCase().includes(inputValue)
        );
    };

    const getSuggestionValue = suggestion => suggestion.excursionFullName;

    const renderSuggestion = suggestion => (
        <span className="bg-white px-2 py-0.5">{suggestion.excursionFullName}</span>
    );

    const theme = {
        container: 'relative',
        suggestionsContainerOpen: 'absolute z-10 bg-white border mt-[-16px] rounded-md shadow-lg max-h-60 overflow-auto ml-4 md:mx-0', // Style for the open suggestions container
        suggestion: 'px-4 py-0.5 cursor-pointer hover:bg-gray-100',
        suggestionHighlighted: 'bg-blue-100'
    };

    const onChange = (event, { newValue }) => {
        setSearchTerm(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Type to search excursions...',
        value: searchTerm,
        onChange: onChange,
        className: 'border border-sunwing-blue px-4 py-1.5 focus:border-sunwing-blue focus:ring-2 focus:ring-sunwing-blue focus:outline-none rounded-md mb-4 relative mx-4 md:mx-0',
    };


    const onSuggestionSelected = (event, { suggestion, method }) => {
        if (method === 'click') {
            setSearchTerm(suggestion.excursionFullName);
            setSuggestions([suggestion]);
        }
    };


    const activeExcursions = searchTerm ? suggestions : getActiveExcursions();

    if (!country || !destination) return (
        <>
            <Banner />
            <h1>Invalid Destination</h1>
        </>
    )

    return (
        <>
            <Banner />

            <div className="page-heading text-center my-10">
                <h1 className="text-sunwing-lightBlack text-4xl px-3 uppercase font-mullernarrow font-extrabold md:text-[44px]">Activities for all</h1>
            </div>

            <div className="px-3 max-w-[1140px] mx-auto">
                <div className="country-column flex flex-col">
                    <div className="column-title flex items-center justify-center py-2 px-2 mb-4">
                        <h2 className="text-xl font-mullernarrow font-extrabold text-sunwing-lightBlack uppercase tracking-wide">Your choice of fun</h2>
                    </div>
                    <div className="country-list w-full flex flex-row overflow-x-auto">
                        {excursionData && excursionData.map((category, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(category.categoryName)}
                                className={`p-2 w-max ${activeCategory === category.categoryName ? 'bg-sunwing-blue text-white' : 'bg-blue-100 text-blue-700 hover:bg-sunwing-blue hover:text-white duration-150 transition-colors ease-in'}`}
                            >
                                {category.categoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="destination-column col-span-8">
                    <div className="column-title flex items-center justify-center py-2 px-2 my-4">
                        <h2 className="text-xl font-mullernarrow font-extrabold text-sunwing-lightBlack uppercase tracking-wide">Select Your Activity</h2>
                    </div>
                    <div>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            onSuggestionSelected={onSuggestionSelected}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            theme={theme}
                        />
                        <div className="excursion-wrapper flex flex-col gap-4 pb-9 md:grid md:grid-cols-2">
                            {activeExcursions.map((excursion, index) => (
                                <article
                                    tabIndex={1}
                                    key={index}
                                    className="flex flex-col gap-2 destination-card p-4 m-4 md:m-0 border border-sunwing-green rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 transition-shadow duration-150 ease-in">
                                    <div className="image-container flex-grow">
                                        {/* {
                                            Object.keys(excursion?.excursionImages).map(objKey => (
                                                <img src={`https:${excursion?.excursionImages[objKey][0]}`} alt={`View of ${excursion.excursionName}`} className="w-full object-cover rounded" />
                                            ))
                                        } */}
                                        <img
                                            src={`https:${excursion.excursionImages.Img4x3?.[0] ?? excursion.excursionImages.Img16x9[0]}`}
                                            alt={`View of ${excursion.excursionName}`}
                                            className="w-full object-cover rounded"
                                        />

                                    </div>
                                    <div className="card-content flex flex-col gap-2">
                                        <h3 className="font-bold font-ptsans text-lg leading-none">{excursion.excursionName}</h3>
                                        <p className="text-sunwing-black leading-[22px]">{excursion.excursionShortDescription}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Excursion;