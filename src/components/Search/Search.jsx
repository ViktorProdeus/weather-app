import cities from "../../dataJson/cities.json";
import { filterCities } from "../../helpers/helpers";


const SearchField = ({searchRef, searchQuery, setSearchQuery, isOpen, dropdownIsOpen, addToListCallback, error}) => {
    const filteredCities = filterCities(cities, searchQuery);
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const isOpenClass = isOpen ? "search open" : "search"

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <div className="error">{error && error}</div>
            <div ref={searchRef} className={isOpenClass}>
                <input
                    onFocus={() => dropdownIsOpen(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    type="text"
                    placeholder="Выбрать город"
                    name="city"
                    autoComplete="off"
                />

                <div className="dropdown">
                    <ul>
                        {filteredCities.map((city, index) => (
                            <li onClick={addToListCallback} key={index} value={city.name}>{city.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </form>
    );
};

export default SearchField;