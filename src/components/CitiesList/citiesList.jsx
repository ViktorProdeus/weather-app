import React from 'react';
import { BiRightArrowAlt } from "react-icons/all";
import { getLocalDate } from "../../helpers/helpers";
import { removeCity, updateCity } from "../../bll/citiesReducer";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

const CitiesList = ({cities, setMessageError}) => {
    const dispatch = useDispatch();

    return (
        <ul className="citiesList">
            {cities && cities.map((city) => {
                const ICON_URL = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
                const ROTATE = `rotate(${city.deg}deg)`;
                const WIDTH = 50;
                const HEIGHT = 50;
                const SIZE = 20;
                const TYPE = "button";
                const ALT = "icon-temp";
                const COLOR = "red";

                const removeCityCallback = () => dispatch(removeCity(city));
                const updateCityCallback = () => dispatch(updateCity(city.name, setMessageError));
                const buttons = [
                    {type: TYPE, className: "button red", name: "Удалить", callback: removeCityCallback},
                    {type: TYPE, className: "button green", name: "Обновить", callback: updateCityCallback},
                ];

                return (
                    <li key={city.id} className="citiesItem">
                        <h3>Город: <span>{city.name}</span></h3>

                        <p>
                            Температура: <span>{Math.round(city.temp)}</span>&#176;C
                            <img width={WIDTH} height={HEIGHT} src={ICON_URL} alt={ALT} />
                        </p>

                        <p>Влажность: <span>{city.humidity}</span>%</p>

                        <p>
                            Атмосферное давление:
                            <span>{city.pressure}</span>
                        </p>

                        <p>
                            Сила и направление ветра:
                            <span>{city.speed}</span>
                            М/С -
                            <BiRightArrowAlt size={SIZE} style={{transform: ROTATE}} color={COLOR} />
                        </p>

                        <p>
                            Последнее обновление данных:
                            <span>{getLocalDate(city.dt)}</span>
                        </p>

                        <div className="buttons">
                            {buttons.map((button, index) => <Button
                                key={index}
                                type={button.type}
                                className={button.className}
                                name={button.name}
                                callback={button.callback}
                            />)}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default CitiesList;