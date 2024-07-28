import reactLogo from "../assets/react.svg";
import Dropdown from "./dropdown";
import { Link } from "react-router-dom";

const dropdownItems = [
    { label: "Home", href: "/" },
    { label: "LLD interview questions", href: "/lld-interview-questions" },
    { label: "Infinite Scroll", href: "/infinite-scroll" },
    { label: "Image Slider", href: "/image-slider" },
    { label: "Confluence File system", href: "/confluence-tree-structure" },
    { label: "Pagination", href: "/pagination" },
    { label: "Sticky Notes", href: "/sticky-notes" },
];

const header = () => {

    return (
        <div className="sticky top-0 flex z-10 justify-between items-center bg-[#242424] text-white">
            <a href="/">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <div>
                <nav className="flex justify-between items-center p-4 gap-5">
                    <Dropdown
                        label="Select component"
                        items={[...dropdownItems]}
                    />
                    <Link to="/about" className="text-white">About</Link>
                    <Link to="/contact" className="text-white">Contact</Link>
                </nav>
            </div>
        </div>
    );
};

export default header;
