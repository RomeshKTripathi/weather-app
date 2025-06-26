import { useContext } from "react";
import { Weather } from "./Context";
import { GradientText } from "./Utilities";

function LocationDate() {
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const { weather } = useContext(Weather);
    const { location } = weather;

    const current = new Date(location.localtime);
    const date = current.toLocaleDateString("en-IN", options);

    return (
        <div className="my-2 flex flex-col  animate-appear-right">
            <div className="text-3xl font-bold font-sans">
                <GradientText>
                    {location.name + ", " + location.country}
                </GradientText>
            </div>
            <div className="  italic font-medium text-sm">{date}</div>
        </div>
    );
}

export default LocationDate;
