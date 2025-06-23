import { useContext, useEffect, useReducer, useRef, useState } from "react";

import CurrentStats from "./CurrentStats.jsx";
import ForecastCard from "./ForcastCard.jsx";
import useFetchData from "./Hooks.js";
import TodayForecast from "./TodayForcast.jsx";
import Background from "./Background.jsx";
import { GradientText } from "./Utilities.jsx";
import { settingsReducer } from "./SettingsReducer.js";
import { Settings } from "./SettingsContext.js";
import { Icons } from "./assets/index.js";
import ChangeLocation from "./ChangeLocation.jsx";

const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
};
function App() {
    const [query, setQuery] = useState("New Delhi");
    const [settings, dispatch] = useReducer(settingsReducer, { isDay: 1 });
    console.log(settings.isDay);

    const {
        data: weather,
        loading: weatherLoading,
        error,
        clearError,
    } = useFetchData("/forecast.json", { q: query, days: 5 });
    const currentTime = weather?.location.localtime;
    console.log(weather);

    useEffect(() => {
        if (!weatherLoading && weather) {
            // dispatch({ type: "IS_DAY", isDay: weather.current.is_day });
        }
    }, [weatherLoading]);

    const equalHours = (t1, t2) => {
        const d1 = new Date(t1);
        const d2 = new Date(t2);
        return d1.getHours() == d2.getHours();
    };

    const handleSetQuery = (location) => {
        setQuery(location);
    };
    return (
        <Settings value={settings}>
            <div className="relative w-screen h-dvh  overflow-x-hidden">
                <Background />
                {error?.message && (
                    <ErrorOccured
                        clearError={clearError}
                        message={error?.message ?? "Something went Wrong !"}
                    />
                )}
                <ChangeLocation handleSetQuery={handleSetQuery} />
                {!weatherLoading && (
                    <div
                        className={` ${
                            settings.isDay
                                ? "md:bg-[url('../public/big_clean_weather.jpg')] max-md:bg-[url('../public/small_day_clean.jpg')] text-neutral-900"
                                : "md:bg-[url('../public/big_night_clean.jpg')] max-md:bg-[url('../public/small_night_clean.jpg')] text-neutral-100"
                        }   bg-cover h-full  overflow-auto`}
                    >
                        <div className="relative p-4 lg:w-3/5 lg:mx-auto">
                            <LocationDate location={weather.location} />
                            <div className="flex flex-col max-md:gap-8 md:flex-row gap-4 justify-between items-center  ">
                                <CurrentTemprature
                                    icon={
                                        Icons[weather.current.condition.code][
                                            settings.isDay
                                        ]
                                    }
                                    text={weather.current.condition.text}
                                    temp={Math.round(weather.current.temp_c)}
                                />
                                <Wrapper>
                                    <CurrentStats
                                        forecast={
                                            weather.forecast.forecastday[0].day
                                        }
                                    />
                                </Wrapper>
                            </div>
                            <div className="max-md:hidden">
                                <h1 className="font-medium text-2xl my-4">
                                    Today's Weather
                                </h1>
                                <div className="flex gap-4 h-auto justify-evenly overflow-auto scroll-smooth">
                                    {weather.forecast.forecastday[0].hour.map(
                                        (item) => {
                                            return (
                                                <TodayForecast
                                                    key={item.time}
                                                    forecast={item}
                                                    outlined={equalHours(
                                                        item.time,
                                                        currentTime
                                                    )}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <h1 className="font-medium text-2xl my-4">
                                Next 5 Days
                            </h1>
                            <div className="flex md:flex-col gap-4 overflow-auto scroll-smooth">
                                {weather.forecast.forecastday.map((item) => {
                                    return (
                                        <ForecastCard
                                            key={item.date}
                                            forecast={item.day}
                                            date={item.date}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Settings>
    );
}

function Wrapper({ children }) {
    const settings = useContext(Settings);

    return (
        <div
            className={`w-full ${
                settings.isDay
                    ? "bg-white/10 text-neutral-900 border border-white"
                    : "bg-black/10 "
            }  text-neutral-100  backdrop-blur-sm animate-appear-left  p-4 rounded-md`}
        >
            {children}
        </div>
    );
}

function CurrentTemprature({ icon, text = "Mostly Sunny", temp = "21" }) {
    return (
        <div className="flex w-full items-center gap-4 md:my-4 ">
            <div className="w-1/2 flex justify-center items-center animate-fade-up">
                {<img className="w-full md:scale-150 scale-125" src={icon} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center animate-fade-up">
                <div className="text-6xl font-thin ">
                    <GradientText>{temp}&deg;C</GradientText>
                </div>
                <span className="text-sm md:text-lg font-light block text-center">
                    {text}
                </span>
            </div>
        </div>
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

function ErrorOccured({ message, timeout = 5000, clearError }) {
    const timeoutRef = useRef(null);
    timeoutRef.current = setTimeout(() => {
        handleClose();
    }, timeout);
    const handleClose = () => {
        clearTimeout(timeoutRef.current);
        clearError();
    };
    console.log(message);
    const settings = useContext(Settings);
    return (
        <div
            className={`absolute right-0 bottom-8 z-20 ${
                settings.isDay
                    ? "bg-white/30 text-neutral-800"
                    : "bg-black/30 text-neutral-100"
            } backdrop-blur-sm  w-fit p-4 rounded-l-md flex items-start justify-end duration-200 animate-slide-left `}
        >
            <p>{message}</p>
            <span
                onClick={handleClose}
                className={`ml-6 mr-3 cursor-pointer ${
                    settings.isDay ? "fill-black" : "fill-white "
                }`}
            >
                <CancelIcon />
            </span>
        </div>
    );
}

export default App;
