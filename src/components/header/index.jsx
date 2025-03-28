import reactLogo from "../../assets/react.svg";
import Dropdown from "./dropdown";
import { Link } from "react-router-dom";
import Theme from "./theme";

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
    <header className="w-full flex z-30 justify-between items-center shadow-md transition-colors duration-200">
      <Link
        to="/"
        className="p-3 flex items-center hover:opacity-80 transition-opacity"
      >
        <img
          src={reactLogo}
          className="logo react h-8 w-8 mr-2"
          alt="React logo"
        />
        <span className="font-medium text-lg">Engineer Babu</span>
      </Link>
      <div>
        <nav className="flex justify-between items-center p-4 gap-5">
          <Dropdown label="Select component" items={[...dropdownItems]} />
          <Link to="/contact" className="hover:opacity-80 transition-colors">
            Contact
          </Link>
          <Theme />
        </nav>
      </div>
    </header>
  );
};

export default Header;
