import { useContext, useRef } from "react";
import { Weather } from "./Context";

export function Wrapper({ children }) {
    const { isDay } = useContext(Weather);

    return (
        <div
            className={`w-full ${
                isDay
                    ? "bg-white/10 text-neutral-900 border border-white"
                    : "bg-black/10 "
            }  text-neutral-100  backdrop-blur-sm animate-appear-left  p-4 rounded-md`}
        >
            {children}
        </div>
    );
}

export function GradientText({ children }) {
    const { isDay } = useContext(Weather);
    return (
        <span
            className={`bg-gradient-to-r ${
                isDay
                    ? "from-[#020024] via-[#090979] to-[#0068E8]"
                    : "from-[#FAF200] via-[#FF9100] to-[#E05600]"
            } bg-clip-text text-transparent`}
        >
            {children}
        </span>
    );
}

export function CancelIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
        >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}

export const equalHours = (t1, t2) => {
    const d1 = new Date(t1);
    const d2 = new Date(t2);
    return d1.getHours() == d2.getHours();
};

export function ErrorOccured({ message, timeout = 5000, clearError }) {
    if (message == null) return null;
    const timeoutRef = useRef(null);
    timeoutRef.current = setTimeout(() => {
        handleClose();
    }, timeout);
    const handleClose = () => {
        clearTimeout(timeoutRef.current);
        clearError();
    };
    const { isDay } = useContext(Weather);
    return (
        <div
            className={`absolute right-0 bottom-8 z-20 ${
                isDay
                    ? "bg-white/30 text-neutral-800"
                    : "bg-black/30 text-neutral-100"
            } backdrop-blur-sm  w-fit p-4 rounded-l-md flex items-start justify-end duration-200 animate-slide-left `}
        >
            <p>{message}</p>
            <span
                onClick={handleClose}
                className={`ml-6 mr-3 cursor-pointer ${
                    isDay ? "fill-black" : "fill-white "
                }`}
            >
                <CancelIcon />
            </span>
        </div>
    );
}
