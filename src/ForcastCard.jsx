import { useContext } from "react";
import { condition, Icons, style } from "./assets";
import { Settings } from "./SettingsContext";

function ForecastCard({ forecast, date }) {
    const {
        avgtemp_c,
        daily_chance_of_rain,
        maxtemp_c,
        mintemp_c,
        maxwind_mph,
    } = forecast;
    const settings = useContext(Settings);
    const { code, icon, text } = forecast.condition;
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(date);
    return (
        <>
            <div
                className={`flex shrink-0 animate-appear-up max-md:flex-col justify-evenly md:w-full items-center p-2 rounded-md ${
                    settings.isDay
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-400/20"
                        : "bg-gradient-to-r from-blue-400/15 to-violet-400/15"
                } backdrop-blur-sm`}
            >
                <div>
                    <div className="font-medium">
                        {weekday[currentDate.getDay()]}
                    </div>
                    <div className="max-md:hidden">{date}</div>
                </div>
                <div>
                    <img src={Icons[code][settings.isDay]} alt="Weather Icon" />
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

export default ForecastCard;
