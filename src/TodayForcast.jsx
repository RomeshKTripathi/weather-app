import { useContext } from "react";
import { Settings } from "./SettingsContext";

function TodayForecast({ forecast, outlined }) {
    const { temp_c, time } = forecast;
    const { icon, text } = forecast.condition;
    const current = new Date(time);
    const currentTime = current.getHours() + ":" + current.getMinutes();
    const settings = useContext(Settings);
    return (
        <div
            className={`flex  animate-fade-up shrink-0 flex-col items-center p-2 rounded-md ${
                settings.isDay
                    ? "bg-white/30 text-neutral-800"
                    : "bg-black/30 text-neutral-200"
            }  backdrop-blur-md ${
                outlined ? "border-yellow-400" : "border-transparent"
            } border-4`}
        >
            <span className="font-medium">{currentTime}</span>
            <img src={icon} alt="Weather Icon" />
            <span className="font-light ">{temp_c}&deg;C</span>
        </div>
    );
}

export default TodayForecast;
