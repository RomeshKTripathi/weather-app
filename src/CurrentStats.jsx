import { getSun } from "./Hooks";
import { GradientText } from "./Utilities";

function CurrentStats({ forecast }) {
    const { maxtemp_c, mintemp_c, daily_chance_of_rain, maxwind_mph } =
        forecast;

    const [sun, loading] = getSun();

    return (
        <div className="w-full  flex justify-between ">
            <div className="flex flex-col gap-4">
                <Entry temp={true} value={maxtemp_c} title="High" />
                <Entry temp={true} value={mintemp_c} title="Low" />
            </div>
            <div className="flex flex-col gap-4">
                <Entry value={maxwind_mph + "mph"} title="Wind" />
                <Entry value={daily_chance_of_rain + "%"} title={"Rain"} />
            </div>
            {!loading && (
                <div className="flex flex-col gap-4">
                    <Entry value={sun.astro.sunrise} title={"Sunrise"} />
                    <Entry value={sun.astro.sunset} title={"Sunset"} />
                </div>
            )}
        </div>
    );
}

function Entry({ value, title, temp }) {
    return (
        <div>
            <span className="text-lg font-light md:text-xl block">
                {value}
                {temp && <span>&deg;C</span>}
            </span>
            <span className="max-md:text-xs text-sm">{title}</span>
        </div>
    );
}
export default CurrentStats;
