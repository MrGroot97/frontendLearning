import { profileImg } from "./constants";
import { useState } from "react";
import clsx from "clsx";

export const Comment = ({ data }) => {

    const [showReplyComment, setShowReplyComment] = useState(true);

    const { name, comment: commentText, replies = [] } = data;
    
    const imageClasses = clsx('w-10 h-10 rounded-full', {
        'cursor-pointer': replies.length > 0,
    });

    const containerClasses = clsx('flex flex-col ', {
        'border-l border-black': replies.length > 0 && showReplyComment,
    });

    return (
        <div className={containerClasses}>
            <div className="flex items-center">
                <img
                    src={profileImg}
                    alt="profile"
                    className={imageClasses}
                    onClick={() => setShowReplyComment((prev) => !prev)}
                />
                <p className="font-bold pl-3">{name}</p>
                <p className="text-slate-500 pl-1">. timeline</p>
            </div>
            <div className="flex items-center">
                <div className="w-10 h-10"></div>
                <p className="pl-3">{commentText}</p>
            </div>
            {replies.length > 0 && showReplyComment && (
                <div className="pl-5">
                    {replies.map((reply) => {
                        return <Comment key={reply.id} data={reply} />;
                    })}
                </div>
            )}
        </div>
    );
};
