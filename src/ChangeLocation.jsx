import { useContext, useState, useRef } from "react";
import { Weather } from "./Context";
import { CancelIcon } from "./Utilities";

function ChangeLocation({ handleSetQuery }) {
    const { isDay } = useContext(Weather);
    const [input, setInput] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const ref = useRef(null);
    const handleSearchClick = () => {
        handleSetQuery(input);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            handleOpenSearch();
        }, 300);
    };
    const handleOpenSearch = () => {
        clearTimeout(ref.current);
        setOpenSearch((prev) => !prev);
    };

    return (
        <>
            <div
                onClick={handleOpenSearch}
                className={`absolute top-0 ${
                    openSearch ? "hidden" : ""
                } top-6 right-4 md:top-6 z-10 size-[40px] flex items-center justify-center rounded-full hover:bg-white/10 ${
                    isDay ? "fill-neutral-800" : "fill-neutral-100"
                } transition-colors duration-200 cursor-pointer `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                >
                    <path d="M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q27 0 53.5 4.5T585-863l-65 66q-10-2-19.5-2.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-12-1-24t-3-23l66-66q9 26 13.5 54t4.5 59q0 100-79.5 217.5T480-80Zm0-472Zm254-254-46-46-248 248v84h84l248-248-38-38Zm66 10 28-28q11-11 11-28t-11-28l-28-28q-11-11-28-11t-28 11l-28 28 84 84Z" />
                </svg>
            </div>

            <div
                className={`fixed top-0 ${
                    openSearch ? "translate-y-0" : "-translate-y-full"
                } duration-200 ease-out w-screen h-dvh ${
                    isDay ? "bg-white/10 " : "bg-black/10"
                } backdrop-blur-md z-10 top-0 right-0`}
            >
                <div className="w-full relative h-full flex items-center justify-center p-8">
                    <div
                        onClick={handleOpenSearch}
                        className={`absolute cursor-pointer top-8 right-6 max-md:size-8 flex items-center justify-center bg-white/20 rounded-full ${
                            isDay ? "fill-neutral-800" : "fill-white"
                        }`}
                    >
                        <CancelIcon />
                    </div>
                    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4">
                        <input
                            autoFocus={true}
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            className={`border-b ${
                                isDay
                                    ? "border-neutral-600 text-neutral-800"
                                    : "border-white/50 text-neutral-100"
                            } outline-none `}
                        />
                        <button
                            onClick={handleSearchClick}
                            className={`block py-2 ${
                                isDay
                                    ? "text-neutral-800 border-neutral-600"
                                    : "text-neutral-100 border-white/50"
                            }  hover:bg-white/10 cursor-pointer rounded-md border  text-lg text-center`}
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeLocation;
