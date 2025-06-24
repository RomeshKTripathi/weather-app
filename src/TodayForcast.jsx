import { useContext } from "react";
import { Weather } from "./Context";
import { equalHours, GradientText, Headings } from "./Utilities";
import { Icons } from "./assets";

function TodayForecast() {
    const { isDay, weather, today_forecast, forecast_day_index, loading } =
        useContext(Weather);
    const store = useContext(Weather);

    const currentTime = weather.location.localtime;
    return (
        <div className={`${today_forecast ? "" : "max-md:hidden"}`}>
            <h1 className="font-medium text-2xl my-4">
                <Headings>
                    {forecast_day_index == 0
                        ? "Today's Weather"
                        : "Weather on " +
                          weather.forecast.forecastday[forecast_day_index ?? 0]
                              .date}
                </Headings>
            </h1>
            <div className="flex gap-4 h-auto justify-evenly overflow-auto scroll-smooth">
                {weather.forecast.forecastday[forecast_day_index ?? 0].hour.map(
                    (item) => {
                        return (
                            <HourCard
                                key={item.time}
                                forecast={item}
                                highlight={
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

function HourCard({ forecast, highlight }) {
    const { temp_c, time } = forecast;
    const { code } = forecast.condition;
    const current = new Date(time);
    const currentTime = current.getHours() + ":" + current.getMinutes();
    const { isDay } = useContext(Weather);
    return (
        <div
            className={`flex relative animate-slide-left shrink-0 flex-col items-center p-1 rounded-md ${
                isDay
                    ? highlight
                        ? "bg-blue-900/80 text-neutral-100"
                        : "bg-white/30 text-neutral-800"
                    : highlight
                    ? "bg-gradient-to-br from-yellow-400/80 to-orange-600/80"
                    : "bg-black/30 text-neutral-200"
            }  backdrop-blur-md ${
                highlight ? "border-yellow-400" : "border-transparent"
            }`}
        >
            <span className="font-thin ">{temp_c}&deg;C</span>
            <img className="" src={Icons[code][1]} alt="Weather Icon" />
            <span className="">{currentTime}</span>
        </div>
    );
}
