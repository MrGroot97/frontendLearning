import { MdSunny } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { useState } from "react";

const Theme = () => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    };
    return <div className="flex justify-center items-center">
        <button onClick={toggleTheme} className="flex justify-center items-center">
            {theme === "light" ? <RiMoonClearFill className="w-6 h-6 transition-opacity" /> : <MdSunny className="w-6 h-6 transition-opacity" />}
        </button>
    </div>;
};

export default Theme;
