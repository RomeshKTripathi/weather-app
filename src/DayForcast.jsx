import { useContext } from "react";
import { Weather } from "./Context";
import { equalHours, GradientText, Headings } from "./Utilities";
import { Icons } from "./assets";

function DayForecast() {
    const {
        isDay,
        weather,
        today_forecast,
        forecast_day_index,
        loading,
        time,
        timezone,
    } = useContext(Weather);

    const { astro } = weather.forecast.forecastday[forecast_day_index];
    const sunrise = Number(astro.sunrise.slice(0, 2));
    const sunset = Number(astro.sunset.slice(0, 2)) + 12;
    const currentTime = new Date(time);

    const forecast =
        forecast_day_index == 0 && currentTime.getHours() > 2
            ? weather.forecast.forecastday[forecast_day_index].hour.slice(
                  currentTime.getHours() - 1
              )
            : weather.forecast.forecastday[forecast_day_index].hour;

    return (
        <div className={`${today_forecast ? "" : "max-md:hidden"}`}>
            <h1 className="font-medium text-2xl my-4">
                <Headings>
                    {forecast_day_index === 0
                        ? "Today's Weather"
                        : "Weather on " +
                          weather.forecast.forecastday[forecast_day_index].date}
                </Headings>
            </h1>
            <div className="flex gap-4 h-auto  overflow-auto scroll-smooth">
                {forecast.map((item, index) => {
                    return (
                        <HourCard
                            key={item.time}
                            forecast={item}
                            astro={{ sunrise, sunset }}
                            highlight={index == 1 && forecast_day_index == 0}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default DayForecast;

function HourCard({ forecast, highlight, astro }) {
    const { time: localtime } = useContext(Weather);
    const { temp_c, time } = forecast;
    const { code } = forecast.condition;
    const systemTime = new Date(localtime);
    const current = new Date(time);
    const { sunrise, sunset } = astro;
    const options = {
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h12",
    };
    const hour = current.getHours();
    const day = hour < sunrise || hour >= sunset ? 0 : 1;
    const currentTime = current
        .toLocaleTimeString("en-In", options)
        .toUpperCase();

    const { isDay } = useContext(Weather);
    return (
        <div
            className={`flex relative animate-slide-left shrink-0 flex-col items-center p-1 rounded-md ${
                isDay
                    ? highlight
                        ? "bg-blue-900/80 text-neutral-100"
                        : "bg-white/30 text-neutral-800"
                    : highlight
                    ? "bg-gradient-to-br from-orange-600/60 to-yellow-500/60"
                    : "bg-black/20  text-neutral-200"
            }  backdrop-blur-sm `}
        >
            <span className="font-thin ">{temp_c}&deg;C</span>
            <img
                className={`size-16`}
                src={Icons[code][day]}
                alt="Weather Icon"
            />
            <span className="text-xs sm:text-sm">
                {highlight
                    ? systemTime
                          .toLocaleTimeString("en-In", options)
                          .toUpperCase()
                    : currentTime}
            </span>
        </div>
    );
}
