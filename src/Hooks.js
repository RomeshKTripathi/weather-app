import axios from "axios";
import { useContext, useEffect, useState } from "react";

const url = "http://api.weatherapi.com/v1";
const api = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
    params: {
        key: "3ff9e951a96c46d0ba632912252106",
    },
});

const useFetchData = (endpoint, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { query } = options;
    useEffect(() => {
        api.get(url + endpoint, {
            params: {
                key: "3ff9e951a96c46d0ba632912252106",
                ...options,
            },
        })
            .then((res) => setData(res.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [endpoint, options.q, query]);
    const clearError = () => {
        setError(null);
    };
    return { data, loading, error, clearError };
};

export default useFetchData;

export function getSun(options) {
    const [sun, setSun] = useState({});
    const [loading, setLoading] = useState(true);
    const { query } = options;
    useEffect(() => {
        async function fetchData() {
            axios
                .get(url + "/astronomy.json", {
                    params: {
                        q: query,
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
        }
        fetchData();
    }, [query]);
    return [sun, loading];
}

export function useAutoUpdateLocation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const clearError = () => {
        setError("");
    };
    const update = (dispatch) => {
        setLoading(true);
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
            return;
        }
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
            .then((position) => {
                dispatch({
                    type: "SET_QUERY",
                    query: `${position.coords.latitude},${position.coords.longitude}`,
                });
            })
            .catch((err) => {
                setError("Error getting user location", err);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { update, loading, error, clearError };
}
