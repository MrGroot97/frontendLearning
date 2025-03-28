/**
 * Sidebar component for the utility docs, showing categories and file navigation
 */
const UtilitySidebar = ({
  darkMode,
  utilityFiles,
  activeCategory,
  activeFile,
  onSelectFile,
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
          Utility Files
        </h3>

        {Object.entries(utilityFiles).map(
          ([category, { description, files }]) => (
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
                {files.map((file) => (
                  <li key={file.title}>
                    <button
                      onClick={() => onSelectFile(category, file)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 
                      ${
                        activeFile === file
                          ? darkMode
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-blue-500 text-white font-medium"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {file.title}
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

export default UtilitySidebar;
