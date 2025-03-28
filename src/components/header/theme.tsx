import React, { useState, useRef, useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonClearFill, RiComputerLine } from "react-icons/ri";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * Theme toggle component that cycles between light, dark, and system themes
 * Uses the ThemeContext to manage theme state
 */
const Theme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Function to get the current theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <MdSunny className="w-5 h-5 text-yellow-400" />;
      case "dark":
        return <RiMoonClearFill className="w-5 h-5 text-indigo-600" />;
      case "system":
        return <RiComputerLine className="w-5 h-5 text-green-500" />;
      default:
        return <MdSunny className="w-5 h-5 text-yellow-400" />;
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Close menu when theme is selected
  const handleThemeSelect = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 rounded-full transition-all duration-300 theme-button shadow-sm"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {getThemeIcon()}
      </button>

      {/* Dropdown menu for theme selection */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 border py-1 transition-colors duration-200 dropdown-menu"
        >
          <button
            className={`flex items-center w-full px-4 py-2 transition-colors duration-150 text-left dropdown-item ${
              theme === "light" ? "selected-theme" : ""
            }`}
            onClick={() => handleThemeSelect("light")}
          >
            <MdSunny className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
            <span>Light</span>
            {theme === "light" && <span className="ml-auto">✓</span>}
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 transition-colors duration-150 text-left dropdown-item ${
              theme === "dark" ? "selected-theme" : ""
            }`}
            onClick={() => handleThemeSelect("dark")}
          >
            <RiMoonClearFill className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
            <span>Dark</span>
            {theme === "dark" && <span className="ml-auto">✓</span>}
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 transition-colors duration-150 text-left dropdown-item ${
              theme === "system" ? "selected-theme" : ""
            }`}
            onClick={() => handleThemeSelect("system")}
          >
            <RiComputerLine className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
            <span>System</span>
            {theme === "system" && <span className="ml-auto">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Theme;
