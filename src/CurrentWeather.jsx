import { useContext } from "react";
import CurrentStats from "./CurrentStats";
import { Icons } from "./assets";
import { Weather } from "./Context";
import { GradientText, Wrapper } from "./Utilities";

function CurrentWeather({}) {
    // const weather = useContext(Weather);

    const { isDay, weather, loading } = useContext(Weather);
    // console.log(weather);

    return (
        !loading && (
            <div className="flex flex-col max-md:gap-8 md:flex-row gap-4 justify-between items-center  ">
                <CurrentTemprature
                    icon={Icons[weather.current.condition.code][isDay]}
                    text={weather.current.condition.text}
                    temp={Math.round(weather.current.temp_c)}
                />
                <Wrapper>
                    <CurrentStats
                        forecast={weather.forecast.forecastday[0].day}
                    />
                </Wrapper>
            </div>
        )
    );
}

function CurrentTemprature({ icon, text = "Mostly Sunny", temp = "21" }) {
    return (
        <div className="flex w-full items-center  justify-around md:my-4 ">
            <div className="w-1/2 sm:w-1/3 md:w-1/2 flex justify-center items-center animate-fade-up">
                {<img className="w-full  " src={icon} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center animate-fade-up">
                <div className="text-6xl font-thin ">
                    <GradientText>{temp}&deg;C</GradientText>
                </div>
                <span className="text-sm md:text-lg font-light block text-center">
                    {text}
                </span>
            </div>
        </div>
    );
}
export default CurrentWeather;
