import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import SearchField from "./components/Search/Search";
import { listenForOutsideClicks } from "./helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToList, updateCity } from "./bll/citiesReducer";
import UpdateButton from "./components/UpdateButton/UpdateButton";
import CitiesList from "./components/CitiesList/citiesList";

const App = () => {
    const ONE_HUNDRED_MS = 100;
    const FIVE_SECONDS = 5000;
    const searchRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const cities = useSelector(state => state.citiesReducer.cities);
    const checked = useSelector(state => state.citiesReducer.checked);
    const dispatch = useDispatch();

    const setMessageError = (message) => {
        setError("")
        setTimeout(() => setError(message), ONE_HUNDRED_MS)
    }

    const dropdownIsOpen = (isOpen) => {
        setIsOpen(isOpen);
        setError("");
    };

    const resetField = () => {
        dropdownIsOpen(false);
        setSearchQuery("");
    };

    const addToListCallback = (e) => {
        e.preventDefault();
        const city = e.currentTarget.innerHTML;
        dispatch(addToList(cities, city, setMessageError, resetField));
    }

    const updateCitiesList = () => {
        cities.forEach(c => dispatch(updateCity(c.name, setMessageError)))
    }


// eslint-disable-next-line
    useEffect(listenForOutsideClicks(
        listening,
        setListening,
        searchRef,
        setIsOpen,
    )); // for react-onclickoutside plugin

    useEffect(() => {
        let timerID;

        if(checked) {
            timerID = setTimeout(updateCitiesList, FIVE_SECONDS);
        }

        return () => clearTimeout(timerID);
    });


    return (
        <div className="App">
            <div className="searchWrap">
                <SearchField
                    searchRef={searchRef}
                    isOpen={isOpen}
                    dropdownIsOpen={dropdownIsOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    addToListCallback={addToListCallback}
                    error={error}
                />

                <UpdateButton />
            </div>

            <CitiesList cities={cities} setMessageError={setMessageError}/>
        </div>
    );
};

export default App;
