import { getSun } from "./Hooks";

function CurrentStats({ forecast }) {
    const { maxtemp_c, mintemp_c, daily_chance_of_rain, maxwind_mph } =
        forecast;

    const [sun, loading] = getSun();

    return (
        <div className="w-full  flex justify-between ">
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

export default CurrentStats;
