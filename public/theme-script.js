// This script runs before the React app to set the theme and prevent flash of incorrect theme
(function () {
  // Function to apply dark mode - moved to root of function
  function applyDarkMode(documentElement) {
    // First apply classes without transitions
    documentElement.classList.remove("theme-transition");
    documentElement.classList.add("dark");
    // Optionally set a data attribute for more control
    documentElement.setAttribute("data-theme", "dark");
    // Set a CSS variable that can be used for more complex styling
    documentElement.style.setProperty("--theme-mode", "dark");
    // Set background color directly on body
    document.body.style.backgroundColor = "#111827";

    // Apply to all potential containers
    if (document.querySelector("header")) {
      document.querySelector("header").style.backgroundColor = "#111827";
      document.querySelector("header").style.color = "#ffffff";
    }

    if (document.querySelector("footer")) {
      document.querySelector("footer").style.backgroundColor = "#1f2937";
    }

    // Force a reflow before adding transitions back
    void documentElement.offsetWidth;
    documentElement.classList.add("theme-transition");
  }

  // Function to apply light mode - moved to root of function
  function applyLightMode(documentElement) {
    // First apply classes without transitions
    documentElement.classList.remove("theme-transition");
    documentElement.classList.remove("dark");
    documentElement.setAttribute("data-theme", "light");
    documentElement.style.setProperty("--theme-mode", "light");
    // Set background color directly on body
    document.body.style.backgroundColor = "#ffffff";

    // Apply to all potential containers
    if (document.querySelector("header")) {
      document.querySelector("header").style.backgroundColor = "#f8fafc";
      document.querySelector("header").style.color = "#1a202c";
    }

    if (document.querySelector("footer")) {
      document.querySelector("footer").style.backgroundColor = "#f7fafc";
    }

    // Force a reflow before adding transitions back
    void documentElement.offsetWidth;
    documentElement.classList.add("theme-transition");
  }

  try {
    // Add style to the document to control transitions
    const style = document.createElement("style");
    style.textContent = `
      .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
      }
      html:not(.theme-transition) * {
        transition: none !important;
      }
    `;
    document.head.appendChild(style);

    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    const documentElement = document.documentElement;

    // Initially disable transitions
    documentElement.classList.remove("theme-transition");

    if (storedTheme === "dark") {
      // Apply dark mode
      applyDarkMode(documentElement);
    } else if (storedTheme === "light") {
      // Ensure light mode
      applyLightMode(documentElement);
    } else {
      // System theme or no preference, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        applyDarkMode(documentElement);
      } else {
        applyLightMode(documentElement);
      }

      // If explicitly set to system, set a data attribute
      if (storedTheme === "system") {
        documentElement.setAttribute("data-theme-preference", "system");
      }
    }

    // Listen for theme changes from the app
    window.addEventListener("themeChange", function (e) {
      if (e.detail && e.detail.theme) {
        documentElement.classList.add("theme-transition");
        if (e.detail.theme === "dark") {
          documentElement.classList.add("dark");
        } else {
          documentElement.classList.remove("dark");
        }
      }
    });
  } catch (error) {
    // Fallback in case of any errors
    console.error("Theme initialization error:", error);
  }
})();
