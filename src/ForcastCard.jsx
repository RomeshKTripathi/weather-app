function ForecastCard({ forecast, date }) {
    const {
        avgtemp_c,
        daily_chance_of_rain,
        maxtemp_c,
        mintemp_c,
        maxwind_mph,
    } = forecast;
    const { icon, text } = forecast.condition;
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(date);
    return (
        <>
            <div className="flex shrink-0 animate-appear-up max-md:flex-col justify-evenly md:w-full text-white items-center p-2 max-md:rounded-md max-md:bg-black/30 ">
                <div>
                    <div>{weekday[currentDate.getDay()]}</div>
                    <div className="max-md:hidden">{date}</div>
                </div>
                <div>
                    <img src={icon ?? day_blizzard} alt="Weather Icon" />
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
