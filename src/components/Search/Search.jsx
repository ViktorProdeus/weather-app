import cities from "../../dataJson/cities.json";
import { filterCities } from "../../helpers/helpers";
import { TextField, Typography } from "@mui/material";


const SearchField = ({searchRef, searchQuery, setSearchQuery, isOpen, dropdownIsOpen, addToListCallback, error}) => {
    const filteredCities = filterCities(cities, searchQuery);
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const isOpenClass = isOpen ? "search open" : "search"

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <Typography sx={{fontSize: 16}} className="error">{error}</Typography>
            <div ref={searchRef} className={isOpenClass}>
                <TextField
                    label="Выбрать город"
                    fullWidth
                    onFocus={() => dropdownIsOpen(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    placeholder="Выбрать город"
                    name="city"
                    autoComplete="off"
                />

                <div className="dropdown">
                    <ul>
                        {filteredCities.map((city, index) => (
                            <Typography component="li" onClick={addToListCallback} key={index} value={city.name}
                                        paddingLeft={1}>{city.name}</Typography>
                        ))}
                    </ul>
                </div>
            </div>
        </form>
    );
};

export default SearchField;