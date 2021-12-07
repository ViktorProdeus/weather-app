import React from 'react';
import { BiUpArrowAlt } from "react-icons/all";
import { getLocalDate } from "../../helpers/helpers";
import { removeCity, updateCity } from "../../bll/citiesReducer";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { Card, Typography } from "@mui/material";

const CitiesList = ({cities, setMessageError}) => {
    const dispatch = useDispatch();

    return (
        <ul className="citiesList">
            {cities && cities.map((city) => {
                const ICON_URL = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
                const ROTATE = `rotate(${city.deg}deg)`;

                const removeCityCallback = () => dispatch(removeCity(city));
                const updateCityCallback = () => dispatch(updateCity(city.name, setMessageError));

                return (
                    <Card component="li" key={city.id} className="citiesItem">
                        <Typography variant="h3" sx={{fontSize: 16, fontWeight: "bold"}} marginBottom={3}
                                    marginTop={3}>Город: <span>{city.name}</span></Typography>
                        <div>
                            <img width={100} height={100} src={ICON_URL} alt="icon-temp" />
                        </div>
                        <Typography sx={{fontSize: 14}} color="text.secondary" marginBottom={2}>
                            Температура: <span>{Math.round(city.temp)}</span>&#176;C

                        </Typography>

                        <Typography sx={{fontSize: 14}} color="text.secondary"
                                    marginBottom={2}>Влажность: <span>{city.humidity}</span>%</Typography>

                        <Typography sx={{fontSize: 14}} color="text.secondary" marginBottom={2}>
                            Атмосферное давление:
                            <span>{city.pressure}</span>
                        </Typography>

                        <Typography sx={{fontSize: 14}} color="text.secondary" marginBottom={2}>
                            Сила и направление ветра:
                            <span>{city.speed}</span>
                            М/С -
                            <BiUpArrowAlt size={20} style={{transform: ROTATE}} color="red" />
                        </Typography>

                        <Typography sx={{fontSize: 14}} color="text.secondary" marginBottom={3}>
                            Последнее обновление данных:
                            <span>{getLocalDate(city.dt)}</span>
                        </Typography>

                        <div className="buttons">
                            <Button
                                type="button"
                                size="medium"
                                variant="contained"
                                color="error"
                                name="Удалить"
                                callback={removeCityCallback}
                            />

                            <Button
                                type="button"
                                size="medium"
                                variant="outlined"
                                color="primary"
                                name="Обновить"
                                callback={updateCityCallback}
                            />
                        </div>
                    </Card>
                );
            })}
        </ul>
    );
};

export default CitiesList;