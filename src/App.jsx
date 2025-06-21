import { day_blizzard } from "./assets/index.js";

function App() {
    return (
        <div className=" bg-[url('../public/clouds.jpg')] bg-cover h-screen text-neutral-200 ">
            <div className="p-4 lg:w-3/5 lg:mx-auto">
                <LocationDate />
                <div className="flex flex-col max-md:gap-8 md:flex-row gap-4 justify-between items-center  ">
                    <CurrentTemprature />
                    <Wrapper>
                        <CurrentStats />
                    </Wrapper>
                </div>
                <div className="max-md:hidden">
                    <h1 className="font-thin text-2xl my-4">Today's Weather</h1>
                    <div className="flex gap-4 justify-evenly">
                        <TodayForcast />
                        <TodayForcast />
                        <TodayForcast />
                        <TodayForcast />
                        <TodayForcast />
                        <TodayForcast />
                        <TodayForcast />
                    </div>
                </div>
                <h1 className="font-thin text-2xl my-4">Next 5 Days</h1>
                <div className="flex md:flex-col gap-4 overflow-auto ">
                    <ForcastCard />
                    <ForcastCard />
                    <ForcastCard />
                </div>
            </div>
        </div>
    );
}

function TodayForcast({
    time = "Tue",
    image = { day_blizzard },
    low = 18,
    high = 23,
}) {
    return (
        <div className="flex shrink-0 flex-col items-center p-2 rounded-md bg-amber-300 text-neutral-700">
            <span className="font-medium">{time}</span>
            <img src={day_blizzard} alt="Weather Icon" />
            <span className="font-light ">
                {low}-{high}&deg;C
            </span>
        </div>
    );
}
function ForcastCard({
    time = "Tue",
    image = { day_blizzard },
    low = 18,
    high = 23,
    date = "23/5",
    wind = 8,
    rain = 3,
}) {
    return (
        <>
            <div className="flex shrink-0 max-md:flex-col justify-evenly md:w-full text-white items-center p-2 max-md:rounded-md max-md:bg-amber-300 ">
                <div>
                    <div>{time}</div>
                    <div className="max-md:hidden">{date}</div>
                </div>
                <div>
                    <img src={day_blizzard} alt="Weather Icon" />
                </div>
                <div className="max-md:hidden">
                    <div>{low}&deg;C</div>
                    <div>Low</div>
                </div>
                <div className="max-md:hidden">
                    <div>{high}&deg;C</div>
                    <div>High</div>
                </div>
                <div className="max-md:hidden">
                    <div>{wind}mph</div>
                    <div>Wind</div>
                </div>
                <div className="max-md:hidden">
                    <div>{rain}%</div>
                    <div>Rain</div>
                </div>
                <div className="md:hidden text-center">
                    {low}-{high}&deg;C
                </div>
            </div>
        </>
    );
}
function CurrentStats() {
    return (
        <div className="w-full  flex justify-between">
            <div className="flex flex-col gap-4">
                <div>
                    <span className="text-xl block">23&deg;C</span>
                    <span className="font-thin">High</span>
                </div>
                <div>
                    <span className="text-xl block">14&deg;C</span>
                    <span className="font-thin">Low</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <span className="text-xl block">7mph</span>
                    <span className="font-thin">Wind</span>
                </div>
                <div>
                    <span className="text-xl block">0%</span>
                    <span className="font-thin">Rain</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <span className="text-xl block">05:27</span>
                    <span className="font-thin">Sunrise</span>
                </div>
                <div>
                    <span className="text-xl block">20:57</span>
                    <span className="font-thin">Sunset</span>
                </div>
            </div>
        </div>
    );
}

function Wrapper({ children }) {
    return (
        <div className="w-full bg-white/10 border border-white/50 backdrop-blur-sm p-4 rounded-md">
            {children}
        </div>
    );
}

function CurrentTemprature({ temprature, type }) {
    return (
        <div className="flex w-full items-center gap-4 ">
            <div className="w-1/2 flex justify-center items-center">
                {<img className="w-2/3 " src={day_blizzard} />}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <div className="text-5xl font-thin ">21&deg; C</div>
                <span className="text-lg">Mostly Sunny</span>
            </div>
        </div>
    );
}
function LocationDate({ location = "London, UK", date = "Monday 29 August" }) {
    return (
        <div className="my-2 flex flex-col gap-2">
            <div className="text-3xl font-medium font-sans">{location}</div>
            <div className="font-thin text-lg">{date}</div>
        </div>
    );
}

export default App;
