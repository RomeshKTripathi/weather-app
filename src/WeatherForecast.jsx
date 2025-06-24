import { useContext } from "react";
import { condition, Icons, style } from "./assets";
import { Actions, Weather } from "./Context";

function WeatherForecast() {
    const { weather, today_forecast, forecast_day_index } = useContext(Weather);
    const dispatch = useContext(Actions);

    const handleForecast = (index) => {
        dispatch({
            type: "HOUR_FORECAST",
            forecast_day_index: index,
        });
    };
    const closeForecast = (index) => {
        dispatch({
            type: "NO_HOURLY_FORECAST",
        });
    };
    return (
        <>
            <h1 className="font-medium text-2xl my-4">Next 5 Days</h1>

            <div className="flex md:flex-col gap-4 overflow-auto scroll-smooth">
                {weather.forecast.forecastday.map((item, index) => {
                    return (
                        <ForecastCard
                            onclick={
                                forecast_day_index === index &&
                                today_forecast == true
                                    ? closeForecast
                                    : handleForecast
                            }
                            key={item.date}
                            forecast={item.day}
                            date={item.date}
                            index={index}
                            outlined={
                                today_forecast && forecast_day_index === index
                            }
                        />
                    );
                })}
            </div>
        </>
    );
}

export default WeatherForecast;

function ForecastCard({ forecast, date, onclick, index, outlined = false }) {
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
    const currentDate = new Date(date);

    return (
        <>
            <div
                onClick={() => {
                    console.log("Clicked - ", index);
                    onclick(index);
                }}
                className={`flex shrink-0 animate-appear-up max-md:flex-col justify-evenly md:w-full items-center p-2 rounded-md border-4 border-transparent ${
                    outlined ? " border-yellow-400/70" : ""
                }  ${
                    isDay
                        ? "max-md:bg-gradient-to-r from-amber-500/20 to-yellow-400/20"
                        : "max-md:bg-black/10"
                } backdrop-blur-sm`}
            >
                <div>
                    <div className="font-medium  md:hidden">
                        {weekday[currentDate.getDay()].slice(0, 3)}
                    </div>
                    <div className="font-medium  hidden md:block">
                        {weekday[currentDate.getDay()]}
                    </div>
                    <div className="max-md:hidden">{date}</div>
                </div>
                <div>
                    <img src={Icons[code][isDay]} alt="Weather Icon" />
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
                <div className="md:hidden text-center">
                    {Math.round(mintemp_c)}-{Math.round(maxtemp_c)}&deg;C
                </div>
            </div>
        </>
    );
}
