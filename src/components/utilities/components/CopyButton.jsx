import { FaCopy, FaCheck } from "react-icons/fa";

/**
 * Button component for copying code snippets with visual feedback
 * @param {object} props - Component props
 * @param {string} props.code - The code snippet to copy
 * @param {string} props.type - The type of code (implementation/usage)
 * @param {number} props.index - The index of the code block
 * @param {boolean} props.darkMode - Whether dark mode is enabled
 * @param {function} props.handleCopyCode - Function to handle copying code
 * @param {string|null} props.copiedIndex - The index of the currently copied code block
 */
const CopyButton = ({
  code,
  type,
  index,
  darkMode,
  handleCopyCode,
  copiedIndex,
}) => {
  const isCopied = copiedIndex === `${type}-${index}`;

  return (
    <button
      className={`absolute top-3 right-3 px-3 py-1.5 rounded-md z-10
        ${
          darkMode
            ? isCopied
              ? "bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
            : isCopied
            ? "bg-green-500"
            : "bg-blue-500 hover:bg-blue-600"
        } 
        transition-colors duration-200 text-sm font-medium text-white shadow-md`}
      onClick={() => handleCopyCode(code, type, index)}
      aria-label={isCopied ? "Copied" : "Copy code"}
    >
      {isCopied ? (
        <span className="flex items-center">
          <FaCheck className="h-4 w-4 mr-1.5" />
          Copied!
        </span>
      ) : (
        <span className="flex items-center">
          <FaCopy className="h-4 w-4 mr-1.5" />
          Copy
        </span>
      )}
    </button>
  );
};

export default CopyButton;
