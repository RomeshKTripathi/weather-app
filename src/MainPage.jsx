import { useContext } from "react";
import { Weather } from "./Context";
import CurrentWeather from "./CurrentWeather";
import DayForecast from "./DayForcast";
import WeatherForecast from "./WeatherForecast";
import ChangeLocation from "./ChangeLocation";
import { GradientText } from "./Utilities";
import LocationDate from "./LocationData";

function MainPage() {
    const { isDay } = useContext(Weather);

    return (
        <div
            className={` ${
                isDay
                    ? "md:bg-[url('../public/big_clean_weather.jpg')] max-md:bg-[url('../public/small_day_clean.jpg')] text-neutral-900"
                    : "bg-[url('../public/clear_big_dark.jpg')] max-md:bg-[url('../public/day_clean.jpg')] text-neutral-100"
            } relative w-full  bg-cover h-full  overflow-auto`}
        >
            <ChangeLocation />
            <div className="relative p-4 lg:w-3/5 lg:mx-auto">
                <LocationDate />
                <CurrentWeather />
                <DayForecast />
                <WeatherForecast />
            </div>
        </div>
    );
}

export default MainPage;
