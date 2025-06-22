import { useEffect, useRef, useState } from "react";
import { day_blizzard } from "./assets/index.js";
import CurrentStats from "./CurrentStats.jsx";
import ForecastCard from "./ForcastCard.jsx";
import useFetchData, { getCurrentWeather } from "./Hooks.js";
import TodayForecast from "./TodayForcast.jsx";

const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
};
function App() {
    const [query, setQuery] = useState("Mathura");

    const {
        data: weather,
        loading: weatherLoading,
        error,
        clearError,
    } = useFetchData("/forecast.json", { q: query, days: 5 });

    const handleSetQuery = (location) => {
        setQuery(location);
    };
    return (
        <div className="relative w-screen h-dvh  overflow-x-hidden">
            {error?.message && (
                <ErrorOccured
                    clearError={clearError}
                    message={error?.message ?? "Something went Wrong !"}
                />
            )}
            <ChangeLocation handleSetQuery={handleSetQuery} />
            <div
                className={`max-md:bg-[url('../public/day_clean.jpg')] md:bg-[url('../public/clean_weather.jpg')] bg-cover h-full text-neutral-200 overflow-auto`}
            >
                {!weatherLoading && (
                    <div className="relative p-4 lg:w-3/5 lg:mx-auto">
                        <LocationDate location={weather.location} />
                        <div className="flex flex-col max-md:gap-8 md:flex-row gap-4 justify-between items-center  ">
                            <CurrentTemprature
                                icon={weather.current.condition.icon}
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
                            <div className="flex gap-4 justify-evenly overflow-auto scroll-smooth">
                                {weather.forecast.forecastday[0].hour.map(
                                    (item) => {
                                        return (
                                            <TodayForecast
                                                key={item.time}
                                                forecast={item}
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
                )}
            </div>
        </div>
    );
}

function Wrapper({ children }) {
    return (
        <div className="w-full bg-black/30 border border-white/20 animate-appear-left  p-4 rounded-md">
            {children}
        </div>
    );
}

function CurrentTemprature({ icon, text = "Mostly Sunny", temp = "21" }) {
    return (
        <div className="flex w-full items-center gap-4 ">
            <div className="w-1/2 flex justify-center items-center animate-fade-up">
                {<img className="w-2/3" src={icon ?? day_blizzard} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center animate-fade-up">
                <div className="text-5xl font-thin ">{temp}&deg;C</div>
                <span className="text-lg font-light">{text}</span>
            </div>
        </div>
    );
}
function LocationDate({ location }) {
    const place = location.name + ", " + location.country;
    const current = new Date(location.localtime);
    const date = current.toLocaleDateString("en-IN", options);
    return (
        <div className="my-2 flex flex-col gap-2 animate-appear-right">
            <div className="text-3xl font-medium font-sans">{place}</div>
            <div className="font-light text-lg">{date}</div>
        </div>
    );
}

function ChangeLocation({ handleSetQuery }) {
    const [input, setInput] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const ref = useRef(null);
    const handleSearchClick = () => {
        handleSetQuery(input);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            handleOpenSearch();
        }, 300);
    };
    const handleOpenSearch = () => {
        clearTimeout(ref.current);
        setOpenSearch((prev) => !prev);
    };

    return (
        <>
            <div
                onClick={handleOpenSearch}
                className={`absolute ${
                    openSearch ? "hidden" : ""
                } top-6 right-4 md:top-6 z-10 size-[40px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                >
                    <path d="M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q27 0 53.5 4.5T585-863l-65 66q-10-2-19.5-2.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-12-1-24t-3-23l66-66q9 26 13.5 54t4.5 59q0 100-79.5 217.5T480-80Zm0-472Zm254-254-46-46-248 248v84h84l248-248-38-38Zm66 10 28-28q11-11 11-28t-11-28l-28-28q-11-11-28-11t-28 11l-28 28 84 84Z" />
                </svg>
            </div>

            <div
                className={`absolute ${
                    openSearch ? "translate-y-0" : "-translate-y-full"
                } duration-200 ease-out w-screen h-dvh bg-black/90 z-10 top-0 right-0`}
            >
                <div className="w-full relative h-full flex items-center justify-center p-8">
                    <div
                        onClick={handleOpenSearch}
                        className="absolute cursor-pointer top-8 right-8 max-md:size-8 flex items-center justify-center bg-white/20 rounded-full"
                    >
                        <CancelIcon />
                    </div>
                    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            className="border-b border-white/50 text-white outline-none"
                        />
                        <button
                            onClick={handleSearchClick}
                            className="block py-2 text-neutral-100  hover:bg-white/10 cursor-pointer rounded-md border border-white/50 text-lg text-center "
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </>
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

    return (
        <div
            className={`absolute right-0 bottom-8 z-20 bg-black  text-white  w-fit p-4 rounded-l-md flex items-start justify-end duration-200 animate-slide-left `}
        >
            <p>{message}</p>
            <span onClick={handleClose} className="ml-6 mr-3 cursor-pointer">
                <CancelIcon />
            </span>
        </div>
    );
}

function CancelIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
        >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}
export default App;
