function TodayForecast({ forecast }) {
    const { temp_c, time } = forecast;
    const { icon, text } = forecast.condition;
    const current = new Date(time);
    const currentTime = current.getHours() + ":" + current.getMinutes();

    return (
        <div
            className={`flex animate-fade-up shrink-0 flex-col items-center p-2 rounded-md bg-black/50 text-white border-black`}
        >
            <span className="font-medium">{currentTime}</span>
            <img src={icon ?? day_blizzard} alt="Weather Icon" />
            <span className="font-light ">{temp_c}&deg;C</span>
        </div>
    );
}

export default TodayForecast;
