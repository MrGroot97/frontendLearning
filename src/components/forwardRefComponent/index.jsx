import { useRef, forwardRef } from "react";

// eslint-disable-next-line react/display-name
const ForwardRefInput = forwardRef((props, ref) => {
  return (
    <div className="relative flex-1 max-w-sm">
      <input
        type="text"
        ref={ref}
        className="w-full h-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-gray-400 dark:border-gray-500 rounded-md px-4 py-2 shadow-md transition-all duration-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
        placeholder="Type something here..."
      />
    </div>
  );
});

export const InputComponent = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="forwardRefComponent flex flex-col md:flex-row items-center justify-center w-full gap-4 py-6">
      <ForwardRefInput ref={inputRef} />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg px-6 py-3 shadow-md"
        onClick={handleClick}
      >
        Focus input
      </button>
    </div>
  );
};
