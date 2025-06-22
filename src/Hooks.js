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
                    q: "Mathura",
                    key: "3ff9e951a96c46d0ba632912252106",
                },
            })
            .then((response) => {
                // console.log(response.data);
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
                params: {
                    q: userLocation(),
                    key: "3ff9e951a96c46d0ba632912252106",
                },
            })
            .then((response) => {
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

function userLocation() {
    const location = null;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                location = { latitude, longitude };
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
    return location ?? "India";
}
