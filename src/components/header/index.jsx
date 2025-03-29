import reactLogo from "../../assets/react.svg";
// Keeping the import commented out so we know it's available for future use
// import Dropdown from "./dropdown";
import { Link } from "react-router-dom";
import Theme from "./theme";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * Header component with navigation links that animates on scroll
 * Using a progressive approach with scroll-based width reduction and backdrop blur
 */
const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { effectiveTheme } = useTheme();
  const isDarkMode = effectiveTheme === "dark";
  const headerRef = useRef(null);

  // Handle scroll events with throttling and calculate progressive values
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll progress as a value between 0 and 1
          // Max transition at 150px scroll
          const progress = Math.min(window.scrollY / 150, 1);
          setScrollProgress(progress);

          // Toggle the is-scrolled class on the body element
          if (window.scrollY > 50) {
            document.body.classList.add("is-scrolled");
          } else {
            document.body.classList.remove("is-scrolled");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listener with passive flag for performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial state
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("is-scrolled");
    };
  }, []);

  // Calculate width based on scroll progress - from 100% to 80%
  // Use a slightly more conservative approach for better centering
  const headerWidth = Math.max(80, 100 - scrollProgress * 20);

  // Cap the minimum width to ensure it's never too narrow
  const effectiveWidth = Math.max(headerWidth, 80);

  // Other style calculations
  const borderRadius = scrollProgress * 8; // Increase border radius up to 8px
  const paddingY = 4 - scrollProgress * 2; // Reduce padding from 4 to 2
  const logoSize = 8 - scrollProgress * 2; // Reduce logo size from 8 to 6
  const fontSize = scrollProgress > 0.5 ? "text-base" : "text-lg"; // Text size transition

  // Box shadow intensity based on scroll progress
  const boxShadowOpacity = scrollProgress * 0.2; // Up to 0.2 opacity
  const boxShadow =
    scrollProgress > 0
      ? `0 4px 10px rgba(0, 0, 0, ${boxShadowOpacity})`
      : "none";

  // Backdrop blur effect that increases with scroll
  const backdropBlur = Math.floor(scrollProgress * 10); // 0-10px blur

  // Background opacity decreases slightly as blur increases for glass effect
  const bgOpacity = isDarkMode
    ? Math.max(0.7, 0.9 - scrollProgress * 0.2) // Dark mode: 0.9 to 0.7 opacity
    : Math.max(0.8, 0.95 - scrollProgress * 0.15); // Light mode: 0.95 to 0.8 opacity

  // Use solid background when not scrolled, then transition to semi-transparent with blur
  const backgroundColor = isDarkMode
    ? scrollProgress === 0
      ? "rgb(17, 24, 39)" // Solid at very top
      : `rgba(17, 24, 39, ${bgOpacity})` // Semi-transparent when scrolled
    : scrollProgress === 0
    ? "rgb(255, 255, 255)" // Solid at very top
    : `rgba(255, 255, 255, ${bgOpacity})`; // Semi-transparent when scrolled

  // Add subtle border for scrolled state
  const borderColor = isDarkMode
    ? `rgba(75, 85, 99, ${scrollProgress * 0.5})` // Dark mode border - gray-600 with opacity
    : `rgba(226, 232, 240, ${scrollProgress * 0.8})`; // Light mode border - gray-200 with opacity

  // Border style transitions smoothly based on scroll progress
  const borderStyle = scrollProgress > 0 ? `1px solid ${borderColor}` : "none";

  // Remove the bottom border completely (it was previously showing in the initial state)
  const borderBottom = "none";

  return (
    <div className="header-wrapper w-full flex justify-center">
      <div
        ref={headerRef}
        className={`header transition-all duration-300 ease-out ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
        style={{
          width: `${effectiveWidth}%`, // Use the capped width value
          borderRadius: `${borderRadius}px`,
          boxShadow: boxShadow,
          backdropFilter: `blur(${backdropBlur}px)`,
          WebkitBackdropFilter: `blur(${backdropBlur}px)`,
          backgroundColor,
          border: borderStyle,
          borderBottom: borderBottom,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between transition-all duration-300 w-full"
          style={{
            padding: `${paddingY * 0.25}rem 1rem`,
          }}
        >
          {/* Logo and title */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-all duration-200"
          >
            <img
              src={reactLogo}
              className="logo react mr-2 transition-all duration-300"
              style={{
                height: `${logoSize * 0.25}rem`,
                width: `${logoSize * 0.25}rem`,
              }}
              alt="React logo"
            />
            <span
              className={`font-medium transition-all duration-300 ${fontSize}`}
            >
              Engineer Babu
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-3 md:gap-5">
            <Link
              to="/lld-interview-questions"
              className="hover:opacity-80 transition-all duration-200 text-sm md:text-base"
            >
              Machine Coding
            </Link>
            <Link
              to="/utilities"
              className="hover:opacity-80 transition-all duration-200 text-sm md:text-base"
            >
              JavaScript Utilities
            </Link>
            <Link
              to="/contact"
              className="hover:opacity-80 transition-all duration-200 text-sm md:text-base"
            >
              Contact
            </Link>
            <Theme />
          </nav>

          {/* Mobile navigation */}
          <div className="sm:hidden flex items-center">
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
