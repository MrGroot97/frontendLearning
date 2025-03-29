import reactLogo from "../../assets/react.svg";
// Keeping the import commented out so we know it's available for future use
// import Dropdown from "./dropdown";
import { Link } from "react-router-dom";
import Theme from "./theme";

/**
 * Header component with navigation links
 *
 * Note: The Dropdown component is intentionally not used here but kept
 * as a separate component for potential future use.
 */
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
          <Link
            to="/lld-interview-questions"
            className="hover:opacity-80 transition-colors"
          >
            Machine Coding
          </Link>
          <Link to="/utilities" className="hover:opacity-80 transition-colors">
            JavaScript Utilities
          </Link>
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
