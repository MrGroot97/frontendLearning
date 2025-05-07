import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import LLDSidebar from "./components/LLDSidebar";
import LLDContent from "./components/LLDContent";
import lldQuestions from "./data";

/**
 * Main component for LLD interview questions, structured with a sidebar and content area
 */
const LLDInterviewQuestions = () => {
  // Set initial active category and question
  const initialCategory = Object.keys(lldQuestions)[0];
  const initialQuestion = lldQuestions[initialCategory].components[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeQuestion, setActiveQuestion] = useState(initialQuestion);

  const { effectiveTheme } = useTheme();
  const darkMode = effectiveTheme === "dark";

  // Handle question selection, which also updates the active category
  const handleQuestionSelect = (category, question) => {
    setActiveCategory(category);
    setActiveQuestion(question);
  };

  return (
    <div
      className={`flex h-[calc(100vh-64px)] ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <LLDSidebar
        darkMode={darkMode}
        questions={lldQuestions}
        activeCategory={activeCategory}
        activeQuestion={activeQuestion}
        onSelectQuestion={handleQuestionSelect}
      />

      {/* Main content */}
      <LLDContent
        darkMode={darkMode}
        currentQuestion={activeQuestion}
        activeCategory={activeCategory}
      />
    </div>
  );
};

export default LLDInterviewQuestions;
