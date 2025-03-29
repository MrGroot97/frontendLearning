export const ChatMessage = ({ name, profile_url, msg, isDarkMode }) => {
  return (
    <div className="flex gap-2 mb-2">
      <img src={profile_url} alt="profile" className="w-8 h-8 rounded-full" />
      <div className="flex flex-col">
        <span
          className={`font-bold ${
            isDarkMode ? "text-blue-300" : "text-blue-700"
          }`}
        >
          {name}
        </span>
        <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
          {msg}
        </span>
      </div>
    </div>
  );
};
