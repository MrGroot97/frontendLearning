/* eslint-disable react/prop-types */
export const Comment = (props) => {
  const { data } = props;
  const profileImg =
    "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png";

  return (
    <div className="pl-10">
      {data.map((comment) => {
        const { id, name, comment: commentText, replies } = comment;
        return (
          <div key={id} className="flex flex-col border-l-2 border-black">
            <div className="flex items-center">
              <img
                src={profileImg}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold pl-3">{name}</p>
              <p className="text-slate-500 pl-1">. timeline</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10"></div>
              <p className="pl-3">{commentText}</p>
            </div>
            {replies.length > 0 && (
                <Comment data={replies} />
            )}
          </div>
        );
      })}
    </div>
  );
};

