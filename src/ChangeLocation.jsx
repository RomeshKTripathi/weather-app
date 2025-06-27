import { useContext, useState, useRef } from "react";
import { Actions, Weather } from "./Context";
import { CancelIcon } from "./Utilities";
import { useAutoUpdateLocation } from "./Hooks";

function ChangeLocation() {
    const { isDay } = useContext(Weather);
    const dispatch = useContext(Actions);
    const [searchInput, setSearchInput] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const { loading, error, update } = useAutoUpdateLocation();
    const ref = useRef(null);
    const handleOpenSearch = () => {
        clearTimeout(ref.current);
        setOpenSearch((prev) => !prev);
    };
    const searchLocation = () => {
        dispatch({ type: "SET_QUERY", query: searchInput });
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            handleOpenSearch();
        }, 300);
    };
    const handleAutoSearchClick = () => {
        update(dispatch);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            handleOpenSearch();
        }, 300);
    };
    return (
        <>
            <div
                onClick={loading ? null : handleOpenSearch}
                className={`absolute top-0 ${
                    openSearch ? "hidden" : ""
                } top-6 right-4 md:top-6 z-10 size-[40px] flex items-center justify-center rounded-full hover:bg-white/10 ${
                    isDay ? "fill-neutral-800" : "fill-neutral-100"
                } transition-colors duration-200 cursor-pointer `}
            >
                {loading ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        className="animate-spin"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                    >
                        <path d="M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q27 0 53.5 4.5T585-863l-65 66q-10-2-19.5-2.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-12-1-24t-3-23l66-66q9 26 13.5 54t4.5 59q0 100-79.5 217.5T480-80Zm0-472Zm254-254-46-46-248 248v84h84l248-248-38-38Zm66 10 28-28q11-11 11-28t-11-28l-28-28q-11-11-28-11t-28 11l-28 28 84 84Z" />
                    </svg>
                )}
            </div>

            <div
                className={`fixed top-0 ${
                    openSearch ? "translate-y-0" : "-translate-y-full"
                } duration-200 ease-out w-screen h-dvh ${
                    isDay ? "bg-white/10 " : "bg-black/10"
                } backdrop-blur-md z-10 top-0 right-0`}
            >
                <div className="w-full relative h-full flex flex-col items-center justify-center p-8">
                    <div
                        onClick={handleOpenSearch}
                        className={`absolute cursor-pointer top-8 right-6 max-md:size-8 flex items-center justify-center bg-white/20 rounded-full ${
                            isDay ? "fill-neutral-800" : "fill-white"
                        }`}
                    >
                        <CancelIcon />
                    </div>
                    <button
                        onClick={handleAutoSearchClick}
                        className="my-6 outline-none cursor-pointer px-4 py-2 font-medium rounded-md bg-yellow-400 text-neutral-800 flex items-center gap-2 *:fill-neutral-800"
                    >
                        <span>Detect Location </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                        >
                            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                        </svg>
                    </button>
                    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4">
                        <input
                            autoFocus={true}
                            type="text"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            className={`border-b ${
                                isDay
                                    ? "border-neutral-600 text-neutral-800"
                                    : "border-white/50 text-neutral-100"
                            } outline-none `}
                        />
                        <button
                            onClick={searchLocation}
                            className={`block py-2 ${
                                isDay
                                    ? "text-neutral-800 border-neutral-600"
                                    : "text-neutral-100 border-white/50"
                            }  hover:bg-white/10 cursor-pointer rounded-md border flex items-center justify-center text-lg text-center`}
                            type="submit"
                        >
                            <span>Search Location </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeLocation;
