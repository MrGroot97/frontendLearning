import { VideoStream } from "./videoStream";
import { ChatWindow } from "./chatWindow";
import { useTheme } from "../../contexts/ThemeContext";

export const LiveStreamChat = () => {
  const { effectiveTheme } = useTheme();
  const isDarkMode = effectiveTheme === "dark";

  return (
    <div
      className={`flex flex-col xl:flex-row pt-5 gap-5 pb-2 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <VideoStream />
      <ChatWindow />
    </div>
  );
};
