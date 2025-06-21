import { day_blizzard } from "./assets/index.js";
import { getCurrentWeather, getSun } from "./Hooks.js";
const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
};
function App() {
    const [weather, weatherLoading] = getCurrentWeather();

    return (
        <div
            className={` max-md:bg-[url('../public/day_clean.jpg')] md:bg-[url('../public/clean_weather.jpg')] bg-cover h-screen text-neutral-200 overflow-auto`}
        >
            {!weatherLoading && (
                <div className="p-4 lg:w-3/5 lg:mx-auto">
                    <LocationDate location={weather.location} />
                    <div className="flex flex-col max-md:gap-8 md:flex-row gap-4 justify-between items-center  ">
                        <CurrentTemprature
                            icon={weather.current.condition.icon}
                            text={weather.current.condition.text}
                            temp={Math.round(weather.current.temp_c)}
                        />
                        <Wrapper>
                            <CurrentStats
                                forecast={weather.forecast.forecastday[0].day}
                            />
                        </Wrapper>
                    </div>
                    <div className="max-md:hidden">
                        <h1 className="font-medium text-2xl my-4">
                            Today's Weather
                        </h1>
                        <div className="flex gap-4 justify-evenly overflow-auto">
                            {weather.forecast.forecastday[0].hour.map(
                                (item) => {
                                    return (
                                        <TodayForecast
                                            key={item.time}
                                            forecast={item}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <h1 className="font-medium text-2xl my-4">Next 5 Days</h1>
                    <div className="flex md:flex-col gap-4 overflow-auto ">
                        {weather.forecast.forecastday.map((item) => {
                            return (
                                <ForecastCard
                                    key={item.date}
                                    forecast={item.day}
                                    date={item.date}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function TodayForecast({ forecast }) {
    const { temp_c, time } = forecast;
    const { icon, text } = forecast.condition;
    const current = new Date(time);
    const currentTime = current.getHours() + ":" + current.getMinutes();

    return (
        <div className="flex shrink-0 flex-col items-center p-2 rounded-md bg-black/50 text-white border-black">
            <span className="font-medium">{currentTime}</span>
            <img src={icon ?? day_blizzard} alt="Weather Icon" />
            <span className="font-light ">{temp_c}&deg;C</span>
        </div>
    );
}
function ForecastCard({ forecast, date }) {
    const {
        avgtemp_c,
        daily_chance_of_rain,
        maxtemp_c,
        mintemp_c,
        maxwind_mph,
    } = forecast;
    const { icon, text } = forecast.condition;
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
            <div className="flex shrink-0 max-md:flex-col justify-evenly md:w-full text-white items-center p-2 max-md:rounded-md max-md:bg-black/30 ">
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
function CurrentStats({ forecast }) {
    const { maxtemp_c, mintemp_c, daily_chance_of_rain, maxwind_mph } =
        forecast;

    const [sun, loading] = getSun();

    return (
        <div className="w-full  flex justify-between">
            <div className="flex flex-col gap-4">
                <div>
                    <span className="text-xl block">{maxtemp_c}&deg;C</span>
                    <span className="font-thin">High</span>
                </div>
                <div>
                    <span className="text-xl block">{mintemp_c}&deg;C</span>
                    <span className="font-thin">Low</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <span className="text-xl block">{maxwind_mph}mph</span>
                    <span className="font-thin">Wind</span>
                </div>
                <div>
                    <span className="text-xl block">
                        {daily_chance_of_rain}%
                    </span>
                    <span className="font-thin">Rain</span>
                </div>
            </div>
            {!loading && (
                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-xl block">
                            {sun.astro.sunrise}
                        </span>
                        <span className="font-thin">Sunrise</span>
                    </div>

                    <div>
                        <span className="text-xl block">
                            {sun.astro.sunset}
                        </span>
                        <span className="font-thin">Sunset</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function Wrapper({ children }) {
    return (
        <div className="w-full bg-black/30 border border-white/20   p-4 rounded-md">
            {children}
        </div>
    );
}

function CurrentTemprature({ icon, text = "Mostly Sunny", temp = "21" }) {
    return (
        <div className="flex w-full items-center gap-4 ">
            <div className="w-1/2 flex justify-center items-center">
                {<img className="w-2/3 " src={icon ?? day_blizzard} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <div className="text-5xl font-thin ">{temp}&deg;C</div>
                <span className="text-lg font-light">{text}</span>
            </div>
        </div>
    );
}
function LocationDate({ location }) {
    const place = location.name + ", " + location.country;
    const current = new Date(location.localtime);
    const date = current.toLocaleDateString("en-IN", options);
    return (
        <div className="my-2 flex flex-col gap-2">
            <div className="text-3xl font-medium font-sans">{place}</div>
            <div className="font-light text-lg">{date}</div>
        </div>
    );
}

export default App;
