import axios from "axios";

export const weatherAPI = {

    getWeather() {
        return axios.get("/api/weather-data").then(res => res.data);
    }

};

