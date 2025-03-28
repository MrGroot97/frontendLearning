import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import UtilitySidebar from "./UtilitySidebar";
import UtilityContent from "./UtilityContent";
import utilityFiles from "./utility-files";

/**
 * Component that displays utility functions with syntax highlighting and explanations
 */
const UtilityDocs = () => {
  // Set initial active category and file
  const initialCategory = Object.keys(utilityFiles)[0];
  const initialFile = utilityFiles[initialCategory].files[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeFile, setActiveFile] = useState(initialFile);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const { effectiveTheme } = useTheme();
  const darkMode = effectiveTheme === "dark";

  const handleCopyCode = (code, type, index) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedIndex(`${type}-${index}`);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // Log the error for debugging
        console.log("Error details:", {
          error: err.message,
          code: code.substring(0, 20) + "...", // Log first 20 chars of the code
        });
      });
  };

  // Handle file selection, which also updates the active category
  const handleFileSelect = (category, file) => {
    setActiveCategory(category);
    setActiveFile(file);
  };

  return (
    <div
      className={`flex h-full ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <UtilitySidebar
        darkMode={darkMode}
        utilityFiles={utilityFiles}
        activeCategory={activeCategory}
        activeFile={activeFile}
        onSelectFile={handleFileSelect}
      />

      {/* Main content */}
      <UtilityContent
        darkMode={darkMode}
        currentUtility={activeFile}
        activeCategory={activeCategory}
        handleCopyCode={handleCopyCode}
        copiedIndex={copiedIndex}
      />
    </div>
  );
};

export default UtilityDocs;
