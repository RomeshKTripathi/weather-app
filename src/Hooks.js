import axios from "axios";
import { useEffect, useState } from "react";

const url = "http://api.weatherapi.com/v1";
// const api = axios.create({
//     baseURL: "http://api.weatherapi.com/v1",
//     params: {
//         key: "3ff9e951a96c46d0ba632912252106",
//     },
// });
// const authorization = {
//     key: "3ff9e951a96c46d0ba632912252106",
// };

// const useFetchData = (endpoint) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         api.get(endpoint)
//             .then((res) => setData(res.data))
//             .catch((err) => setError(err))
//             .finally(() => setLoading(false));
//     }, [endpoint]);

//     return { data, loading, error };
// };

// export default useFetchData;

export function getCurrentWeather() {
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(url + "/forecast.json", {
                params: {
                    days: 5,
                    q: userLocation(),
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
    let location = null;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                location = { latitude, longitude };
                console.log(location);
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
