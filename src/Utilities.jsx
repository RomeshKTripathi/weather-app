import { useContext } from "react";
import { Settings } from "./SettingsContext";

export function GradientText({ children, isDay = 0 }) {
    const settings = useContext(Settings);
    return (
        <span
            className={`bg-gradient-to-r ${
                settings.isDay
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
