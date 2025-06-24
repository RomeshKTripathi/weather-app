import { useContext, useEffect, useReducer, useRef, useState } from "react";

import useFetchData from "./Hooks.js";
import Background from "./Background.jsx";
import { ErrorOccured, GradientText } from "./Utilities.jsx";
import { weatherReducer } from "./Reducers.js";
import { Actions, Weather } from "./Context.js";
import ChangeLocation from "./ChangeLocation.jsx";
import CurrentWeather from "./CurrentWeather.jsx";
import WeatherForecast from "./WeatherForecast.jsx";
import DayForecast from "./DayForcast.jsx";

const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
};
function App() {
    const [query, setQuery] = useState("New Delhi");
    const [store, dispatch] = useReducer(weatherReducer, {
        isDay: 0,
        loading: true,
        weather: null,
        today_forecast: true,
        forecast_day_index: 0,
    });
    const {
        data,
        loading: dataLoading,
        error,
        clearError,
    } = useFetchData("/forecast.json", { q: query, days: 5 });

    useEffect(() => {
        if (dataLoading == false && data != null) {
            dispatch({ type: "IS_DAY", isDay: data.current.is_day });
            dispatch({ type: "SET_DATA", weather: { ...data } });
            console.log("Refreshed");
        }
        return () => {
            dispatch({ type: "LOADING" });
            console.log("Reloading");
        };
    }, [data]);

    const handleSetQuery = (location) => {
        setQuery(location);
    };
    return store.loading ? null : (
        <Weather value={store}>
            <div className="relative w-screen h-dvh select-none overflow-x-hidden">
                <Background />
                <ErrorOccured
                    clearError={clearError}
                    message={error?.message}
                />
                <div
                    className={` ${
                        store.isDay
                            ? "md:bg-[url('../public/big_clean_weather.jpg')] max-md:bg-[url('../public/small_day_clean.jpg')] text-neutral-900"
                            : "md:bg-[url('../public/big_night_clean.jpg')] max-md:bg-[url('../public/small_night_clean.jpg')] text-neutral-100"
                    } relative w-full  bg-cover h-full  overflow-auto`}
                >
                    <ChangeLocation handleSetQuery={handleSetQuery} />
                    <div className="relative p-4 lg:w-3/5 lg:mx-auto">
                        <LocationDate location={data.location} />
                        <CurrentWeather weather={data} />
                        <DayForecast />
                        <Actions value={dispatch}>
                            <WeatherForecast />
                        </Actions>
                    </div>
                </div>
            </div>
        </Weather>
    );
}

function LocationDate({ location }) {
    const place = location.name + ", " + location.country;
    const current = new Date(location.localtime);
    const date = current.toLocaleDateString("en-IN", options);
    return (
        <div className="my-2 flex flex-col  animate-appear-right">
            <div className="text-3xl font-bold font-sans">
                <GradientText>{place}</GradientText>
            </div>
            <div className="  italic font-medium text-sm">{date}</div>
        </div>
    );
}

export default App;
