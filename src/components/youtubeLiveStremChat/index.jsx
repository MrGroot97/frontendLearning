import { VideoStream } from "./videoStream";
import { ChatWindow } from "./chatWindow";

export const LiveStreamChat = () => {
    return (
        <div className="flex flex-col xl:flex-row pt-5 gap-5 pb-2">
            <VideoStream />
            <ChatWindow />
        </div>
    );
};
