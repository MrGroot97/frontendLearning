import { profileImg } from "./constants";
import { useState } from "react";
import clsx from "clsx";

export const Comment = ({ data, level = 0 }) => {
  const [showReplyComment, setShowReplyComment] = useState(true);

  const { name, comment: commentText, replies = [] } = data;

  const imageClasses = clsx("w-10 h-10 rounded-full", {
    "cursor-pointer": replies.length > 0,
  });

  const hasReplies = replies.length > 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-2">
        <img
          src={profileImg}
          alt="profile"
          className={imageClasses}
          onClick={() => setShowReplyComment((prev) => !prev)}
        />
        <div className="flex flex-col ml-3 flex-1 bg-gray-600 p-2 rounded-lg">
          <div className="flex items-center">
            <p className="font-bold text-sm">{name}</p>
            <p className="text-gray-200 pl-1 text-xs">· timeline</p>
          </div>
          <div>
            <p className="text-sm">{commentText}</p>
          </div>
        </div>
      </div>
      {hasReplies && showReplyComment && (
        <div className="relative mt-2">
          {replies.map((reply) => (
            <div key={reply.id} className="flex">
              <div
                className={clsx(
                  "relative w-10 mr-3 flex justify-center items-center",
                  reply.replies.length === 0 ? "hidden" : ""
                )}
                data-level={level + 1}
                onClick={() => setShowReplyComment((prev) => !prev)}
              >
                <div className="border-l-2 border-gray-300 h-full"></div>
              </div>
              <div
                className={clsx(
                  "relative w-10 h-5 flex justify-center items-center",
                  reply.replies.length ? "hidden" : ""
                )}
                data-level={level + 1}
                onClick={() => setShowReplyComment((prev) => !prev)}
              >
                <div className="w-5 ml-auto border-l-2 border-b-2 rounded-bl-md border-gray-300 h-full"></div>
              </div>
              <Comment data={reply} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
