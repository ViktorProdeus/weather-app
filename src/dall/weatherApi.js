import axios from "axios";

export const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
});

const API_KEY = "fa26aa21b1f0200231c3c0c9564e0339";

export const weatherAPI = {
    async get(city) {
        const promise = await instance.get(`weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`);
        const data = promise.data;

        return {
            id: data.id,
            dt: data.dt,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp,
            name: data.name,
            icon: data.weather[0].icon,
            deg: data.wind.deg,
            speed: data.wind.speed,
        }
    }
}