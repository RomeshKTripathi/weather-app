import { useContext } from "react";
import { condition, Icons, style } from "./assets";
import { Actions, Weather } from "./Context";
import { Headings } from "./Utilities";

function WeatherForecast() {
    const { weather, today_forecast, forecast_day_index } = useContext(Weather);
    const dispatch = useContext(Actions);

    const handleForecast = (index) => {
        dispatch({
            type: "HOUR_FORECAST",
            forecast_day_index: index,
        });
    };

    return (
        <>
            <h1 className="font-medium text-2xl my-4">
                <Headings>Next 5 Days</Headings>
            </h1>

            <div className="flex items-center flex-col gap-4 overflow-auto scroll-smooth py-1">
                {weather.forecast.forecastday.map((item, index) => {
                    return (
                        <ForecastCard
                            onclick={handleForecast}
                            key={item.date}
                            forecast={item.day}
                            date={item.date}
                            index={index}
                            highlight={
                                today_forecast && forecast_day_index == index
                            }
                        />
                    );
                })}
            </div>
        </>
    );
}

export default WeatherForecast;

function ForecastCard({ forecast, date, onclick, index, highlight = false }) {
    const { isDay } = useContext(Weather);
    const {
        avgtemp_c,
        daily_chance_of_rain,
        maxtemp_c,
        mintemp_c,
        maxwind_mph,
    } = forecast;
    const { code, icon, text } = forecast.condition;
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentDate = new Date(date);

    return (
        <>
            <div
                onClick={() => {
                    onclick(index);
                }}
                className={` cursor-pointer flex shrink-0 w-full sm:w-2/3 md:w-full animate-appear-up box-border justify-evenly items-center p-1 rounded-md duration-500 ${
                    isDay
                        ? highlight
                            ? "bg-gradient-to-br from-blue-950/80 to-violet-900/80 text-neutral-100"
                            : "bg-blue-400/10 text-blue-900 "
                        : highlight
                        ? "bg-black/50"
                        : "max-md:bg-black/20 bg-black/20"
                } backdrop-blur-sm `}
            >
                <div>
                    <div className="font-medium ">
                        {weekday[currentDate.getDay()].slice(0, 3)}
                    </div>

                    <div className="max-md:text-xs">
                        {currentDate.getDate() +
                            " " +
                            month[currentDate.getMonth()] +
                            ", " +
                            currentDate.getFullYear()}
                    </div>
                </div>
                <div>
                    <img
                        className={`duration-500 transition-all ${
                            highlight
                                ? "max-md:scale-150 scale-125"
                                : "max-md:scale-125 scale-110"
                        }`}
                        src={Icons[code][isDay]}
                        alt="Weather Icon"
                    />
                </div>
                <div className="max-md:hidden">
                    <div>{mintemp_c}&deg;C</div>
                    <div>Low</div>
                </div>
                <div className="max-md:hidden">
                    <div>{maxtemp_c}&deg;C</div>
                    <div>High</div>
                </div>
                <div className="max-md:hidden">
                    <div>{maxwind_mph}mph</div>
                    <div>Wind</div>
                </div>
                <div className="max-md:hidden">
                    <div>{daily_chance_of_rain}%</div>
                    <div>Rain</div>
                </div>
                <div className="text-center md:hidden ">
                    {Math.round(mintemp_c)}-{Math.round(maxtemp_c)}&deg;C
                </div>
            </div>
        </>
    );
}
