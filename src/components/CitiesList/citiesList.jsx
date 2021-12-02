import React from 'react';
import { BiRightArrowAlt } from "react-icons/all";
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
                const WIDTH = 100;
                const HEIGHT = 100;
                const SIZE = 20;
                const TYPE = "button";
                const ALT = "icon-temp";
                const COLOR = "red";

                const removeCityCallback = () => dispatch(removeCity(city));
                const updateCityCallback = () => dispatch(updateCity(city.name, setMessageError));
                const buttons = [
                    {type: TYPE, variant: "contained", size: "medium", color: "error", name: "Удалить", callback: removeCityCallback},
                    {type: TYPE, variant: "outlined", size: "medium", color: "primary", name: "Обновить", callback: updateCityCallback},
                ];

                return (
                    <Card component="li" key={city.id} className="citiesItem">
                        <Typography  variant="h3" sx={{ fontSize: 16, fontWeight: "bold" }} marginBottom={3} marginTop={3}>Город: <span>{city.name}</span></Typography>
                            <div>
                                <img width={WIDTH} height={HEIGHT} src={ICON_URL} alt={ALT} />
                            </div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" marginBottom={2}>
                            Температура: <span>{Math.round(city.temp)}</span>&#176;C

                        </Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" marginBottom={2}>Влажность: <span>{city.humidity}</span>%</Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" marginBottom={2}>
                            Атмосферное давление:
                            <span>{city.pressure}</span>
                        </Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" marginBottom={2}>
                            Сила и направление ветра:
                            <span>{city.speed}</span>
                            М/С -
                            <BiRightArrowAlt size={SIZE} style={{transform: ROTATE}} color={COLOR} />
                        </Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" marginBottom={3}>
                            Последнее обновление данных:
                            <span>{getLocalDate(city.dt)}</span>
                        </Typography>

                        <div className="buttons">
                            {buttons.map((button, index) => <Button
                                key={index}
                                type={button.type}
                                size={button.size}
                                variant={button.variant}
                                color={button.color}
                                name={button.name}
                                callback={button.callback}
                            />)}
                        </div>
                    </Card>
                );
            })}
        </ul>
    );
};

export default CitiesList;