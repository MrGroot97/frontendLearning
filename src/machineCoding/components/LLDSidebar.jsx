/**
 * Sidebar component for the LLD interview questions, showing categories and components
 */
const LLDSidebar = ({
  darkMode,
  questions,
  activeCategory,
  activeQuestion,
  onSelectQuestion,
}) => {
  return (
    <div
      className={`w-64 ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      } h-[calc(100vh-64px)] overflow-y-auto border-r ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="sticky top-0 p-4">
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          LLD Interview Questions
        </h3>

        {Object.entries(questions).map(
          ([category, { description, components }]) => (
            <div key={category} className="mb-6">
              <div
                className={`text-sm font-medium mb-2 ${
                  activeCategory === category
                    ? darkMode
                      ? "text-blue-400"
                      : "text-blue-600"
                    : darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
                title={description}
              >
                {category}
              </div>
              <ul className="space-y-1">
                {components.map((component) => (
                  <li key={component.title}>
                    <button
                      onClick={() => onSelectQuestion(category, component)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 
                      ${
                        activeQuestion === component
                          ? darkMode
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-blue-500 text-white font-medium"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {component.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LLDSidebar;
