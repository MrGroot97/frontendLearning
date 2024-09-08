import reactLogo from "../../assets/react.svg";
import Dropdown from "./dropdown";
import { Link } from "react-router-dom";
import AppThemeIcon from "./theme";

const dropdownItems = [
    { label: "Select Catalog", href: "/" },
    { label: "Sign Maker", href: "/sign-maker" },
    { label: "LLD interview questions", href: "/lld-interview-questions" },
    { label: "Infinite Scroll", href: "/infinite-scroll" },
    { label: "Image Slider", href: "/image-slider" },
    { label: "File system", href: "/confluence-tree-structure" },
    { label: "Pagination", href: "/pagination" },
    { label: "Sticky Notes", href: "/sticky-notes" },
];

const Header = () => {

    return (
        <header className="fixed w-full top-0 flex z-30 justify-between items-center bg-black text-white">
            <Link to="/" className="text-white">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </Link>
            <div>
                <nav className="flex justify-between items-center p-4 gap-5">
                    <Dropdown
                        label="Select component"
                        items={[...dropdownItems]}
                    />
                    <Link to="/contact" className="text-white">Contact</Link>
                    <AppThemeIcon />
                </nav>
            </div>
        </header>
    );
};

export default Header;
