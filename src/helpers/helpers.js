// for cities name
export const filterCities = (cities, query) => {
    if (!query) {
        return [];
    }

    return cities.filter((city) => {
        const cityName = city.name.toLowerCase();
        return cityName.trim().startsWith(query.toLowerCase());
    });
};

// convert response to dataTime
export const getLocalDate = (value) => {
    const ONE_SECOND = 1000;
    const day = new Date(value).getDay();
    value *= ONE_SECOND;
    const monthArr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря",];
    const month = monthArr[new Date(value).getMonth()];
    const year = new Date(value).getFullYear();
    const MAX_VALUE = 10;

    const get2digits = (value) => value >= MAX_VALUE ? value : '0' + value
    const hours = get2digits(new Date(value).getHours());

    const minutes = get2digits(new Date(value).getMinutes());
    const seconds = get2digits(new Date(value).getSeconds());

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
}

// subscribe to Outside clicks
export const listenForOutsideClicks = (listening, setListening, dropDownRef, setIsOpen) => () => {
    if (listening) return;
    if (!dropDownRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
        document.addEventListener(type, (evt) => {
            if (dropDownRef.current.contains(evt.target)) return;
            setIsOpen(false);
        });
    });
};