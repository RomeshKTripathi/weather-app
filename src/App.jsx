import { day_blizzard } from "./assets/index.js";
import CurrentStats from "./CurrentStats.jsx";
import ForecastCard from "./ForcastCard.jsx";
import { getCurrentWeather } from "./Hooks.js";
import TodayForecast from "./TodayForcast.jsx";

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
                        <div className="flex gap-4 justify-evenly overflow-auto scroll-smooth">
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
                    <div className="flex md:flex-col gap-4 overflow-auto scroll-smooth">
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

function Wrapper({ children }) {
    return (
        <div className="w-full bg-black/30 border border-white/20 animate-appear-left  p-4 rounded-md">
            {children}
        </div>
    );
}

function CurrentTemprature({ icon, text = "Mostly Sunny", temp = "21" }) {
    return (
        <div className="flex w-full items-center gap-4 ">
            <div className="w-1/2 flex justify-center items-center animate-fade-up">
                {<img className="w-2/3 " src={icon ?? day_blizzard} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center animate-fade-up">
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
        <div className="my-2 flex flex-col gap-2 animate-appear-right">
            <div className="text-3xl font-medium font-sans">{place}</div>
            <div className="font-light text-lg">{date}</div>
        </div>
    );
}

export default App;
