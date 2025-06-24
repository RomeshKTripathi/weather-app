import { useContext } from "react";
import { Weather } from "./Context";
import { equalHours } from "./Utilities";

function TodayForecast() {
    const { isDay, weather, today_forecast, forecast_day_index, loading } =
        useContext(Weather);
    const store = useContext(Weather);

    const currentTime = weather.location.localtime;
    return (
        <div className={`${today_forecast ? "" : "max-md:hidden"}`}>
            <h1 className="font-medium text-2xl my-4">
                {forecast_day_index == 0
                    ? "Today's Weather"
                    : "Weather on " +
                      weather.forecast.forecastday[forecast_day_index ?? 0]
                          .date}
            </h1>
            <div className="flex gap-4 h-auto justify-evenly overflow-auto scroll-smooth">
                {weather.forecast.forecastday[forecast_day_index ?? 0].hour.map(
                    (item) => {
                        return (
                            <HourCard
                                key={item.time}
                                forecast={item}
                                outlined={
                                    forecast_day_index == 0 &&
                                    equalHours(item.time, currentTime)
                                }
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default TodayForecast;

function HourCard({ forecast, outlined }) {
    const { temp_c, time } = forecast;
    const { icon, text } = forecast.condition;
    const current = new Date(time);
    const currentTime = current.getHours() + ":" + current.getMinutes();
    const { isDay } = useContext(Weather);
    return (
        <div
            className={`flex relative animate-slide-left shrink-0 flex-col items-center p-2 rounded-md ${
                isDay
                    ? "bg-white/30 text-neutral-800"
                    : "bg-black/30 text-neutral-200"
            }  backdrop-blur-md ${
                outlined ? "border-yellow-400" : "border-transparent"
            } border-4`}
        >
            <span className="font-medium">{currentTime}</span>
            <img className="" src={icon} alt="Weather Icon" />
            <span className="font-light ">{temp_c}&deg;C</span>
        </div>
    );
}
