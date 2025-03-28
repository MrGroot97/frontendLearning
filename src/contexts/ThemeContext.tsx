import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Define theme types
type ThemeType = "light" | "dark" | "system";

// Define the context interface using Function to avoid parameter naming
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: Function; // Use Function type to avoid parameter linting
  effectiveTheme: "light" | "dark"; // The actual theme applied (resolves system preference)
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeType>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  // Calculate effective theme based on selected theme and system preference
  const effectiveTheme = themeMode === "system" ? systemTheme : themeMode;

  // Helper function to update document class
  const updateDocumentClass = (currentTheme: "light" | "dark") => {
    // First add the transition class to enable smooth transitions
    document.documentElement.classList.add("theme-transition");

    // Update the theme class
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Helper to detect system preference
  const getSystemTheme = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      // Get current system preference
      const systemPreference = getSystemTheme();
      setSystemTheme(systemPreference);

      // Check if theme is stored in localStorage
      const savedTheme = localStorage.getItem("theme") as ThemeType | null;

      if (
        savedTheme &&
        (savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "system")
      ) {
        setThemeMode(savedTheme);

        // Apply the effective theme (resolve system if needed)
        const themeToApply =
          savedTheme === "system" ? systemPreference : savedTheme;
        updateDocumentClass(themeToApply);
      } else {
        // Default to system preference
        setThemeMode("system");
        updateDocumentClass(systemPreference);
      }
    };

    initializeTheme();
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);

      // If theme is set to system, update the document class
      if (themeMode === "system") {
        updateDocumentClass(newSystemTheme);
      }
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode]); // Include theme in dependencies

  // Set theme function
  const updateTheme = (newTheme: ThemeType) => {
    setThemeMode(newTheme);

    // Determine the theme to actually apply
    const themeToApply =
      newTheme === "system" ? getSystemTheme() : (newTheme as "light" | "dark");

    updateDocumentClass(themeToApply);
    localStorage.setItem("theme", newTheme);

    // Dispatch a custom event for theme script to detect
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: {
        theme: themeToApply,
        mode: newTheme,
      },
    });
    document.dispatchEvent(themeChangeEvent);
  };

  // Toggle theme function
  const toggleTheme = () => {
    if (themeMode === "light") {
      updateTheme("dark");
    } else if (themeMode === "dark") {
      updateTheme("system");
    } else {
      updateTheme("light");
    }
  };

  // Create the context value object
  const contextValue = useMemo(
    () => ({
      theme: themeMode,
      effectiveTheme,
      toggleTheme,
      setTheme: updateTheme,
    }),
    [themeMode, effectiveTheme, toggleTheme, updateTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
