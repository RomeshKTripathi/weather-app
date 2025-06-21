import axios from "axios";
import { useEffect, useState } from "react";
const authorization = {
    key: "3ff9e951a96c46d0ba632912252106",
};
const url = "http://api.weatherapi.com/v1";
export function getCurrentWeather() {
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(url + "/forecast.json", {
                params: {
                    days: 5,
                    q: "India",
                    key: "3ff9e951a96c46d0ba632912252106",
                },
            })
            .then((response) => {
                console.log(response.data);
                setCurrentWeather(response.data);
            })
            .catch((err) => {
                console.log("Error occured:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return [currentWeather, loading];
}
export function getSun() {
    const [sun, setSun] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(url + "/astronomy.json", {
                params: { q: "India", key: "3ff9e951a96c46d0ba632912252106" },
            })
            .then((response) => {
                console.log(response.data);
                setSun(response.data.astronomy);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return [sun, loading];
}
