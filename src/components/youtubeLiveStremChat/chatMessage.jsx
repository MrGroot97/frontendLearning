/* eslint-disable react/prop-types */
export const ChatMessage = ({ name, profile_url, msg }) => {
    return (
        <div className="flex gap-2">
            <img
                src={profile_url}
                alt="profile"
                className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
                <span className="font-bold">{name}</span>
                <span>{msg}</span>
            </div>
        </div>
    );
};
