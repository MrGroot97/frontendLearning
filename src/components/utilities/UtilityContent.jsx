import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";

/**
 * Component for displaying utility file code and documentation
 */
const UtilityContent = ({
  darkMode,
  currentUtility,
  activeCategory,
  handleCopyCode,
  copiedIndex,
}) => {
  return (
    <div
      className={`flex-1 overflow-y-auto ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <div
          className={`flex flex-col md:flex-row md:items-center mb-6 pb-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {currentUtility.title}
          </h1>
          <div
            className={`mt-2 md:mt-0 md:ml-3 px-3 py-1 rounded-full text-sm ${
              darkMode
                ? "bg-gray-700 text-blue-300"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {activeCategory}
          </div>
        </div>

        <div
          className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {currentUtility.description}
        </div>

        {/* Files/Functions within this utility */}
        <div className="space-y-8">
          {currentUtility.files.map((file, index) => (
            <div
              key={index}
              className={`border rounded-lg ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div className="p-5">
                <h2
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {file.name}
                </h2>
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {file.description}
                </p>

                {/* Implementation */}
                <div className="mb-6 border rounded-lg p-4 relative">
                  <h3
                    className={`text-lg font-semibold mb-3 flex items-center ${
                      darkMode ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Implementation
                  </h3>
                  <div className="relative rounded-md">
                    <CopyButton
                      code={file.code}
                      type="implementation"
                      index={index}
                      darkMode={darkMode}
                      handleCopyCode={handleCopyCode}
                      copiedIndex={copiedIndex}
                    />
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      showLineNumbers={true}
                      wrapLines={true}
                      className="rounded-md !mt-0"
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        fontSize: "0.875rem",
                        backgroundColor: darkMode ? "#1a202c" : "#f7fafc",
                        color: darkMode ? "#e2e8f0" : "#2d3748",
                      }}
                    >
                      {file.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="mb-6 border rounded-lg p-4 relative">
                  <h3
                    className={`text-lg font-semibold mb-3 flex items-center ${
                      darkMode ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Usage Example
                  </h3>
                  <div className="relative rounded-md">
                    <CopyButton
                      code={file.usage}
                      type="usage"
                      index={index}
                      darkMode={darkMode}
                      handleCopyCode={handleCopyCode}
                      copiedIndex={copiedIndex}
                    />
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      showLineNumbers={true}
                      wrapLines={true}
                      className="rounded-md !mt-0"
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        fontSize: "0.875rem",
                        backgroundColor: darkMode ? "#1a202c" : "#f7fafc",
                        color: darkMode ? "#e2e8f0" : "#2d3748",
                      }}
                    >
                      {file.usage}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Notes & Best Practices */}
                {file.notes && file.notes.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3
                      className={`text-lg font-semibold mb-3 flex items-center ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Notes & Best Practices
                    </h3>
                    <ul
                      className={`list-disc pl-6 space-y-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {file.notes.map((note, noteIndex) => (
                        <li key={noteIndex}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UtilityContent;
