import { useTheme } from "../../contexts/ThemeContext";

export const ShimmerUi = () => {
  const { effectiveTheme } = useTheme();
  const isDarkMode = effectiveTheme === "dark";

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center my-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col w-fit rounded-lg justify-center border border-solid ${
            isDarkMode ? "border-gray-600" : "border-slate-300"
          }`}
        >
          <div
            className={` w-56 h-56 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded-lg m-2 animate-pulse`}
          ></div>
          <div
            className={`w-56 h-6 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded-lg m-2 animate-pulse`}
          ></div>
        </div>
      ))}
    </div>
  );
};
