import { forwardRef } from "react";
import { BsArchiveFill, BsFillStarFill, BsStar } from "react-icons/bs";

const Note = forwardRef(
  (
    {
      note,
      onDelete = () => void 0,
      onStarred = () => void 0,
      isDarkMode = false,
      ...props
    },
    ref
  ) => {
    const { title, position, starred } = note;

    // Choose colors based on theme
    const bgColor = isDarkMode ? "bg-gray-700" : "bg-yellow-200";
    const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
    const borderStyle = isDarkMode ? "border border-gray-600" : "";

    return (
      <div
        className={`absolute ${bgColor} ${textColor} ${borderStyle} min-w-[300px] rounded-md p-2 flex items-center justify-between select-none cursor-move shadow-md`}
        style={{ top: position?.y, left: position?.x }}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col gap-1 cursor-pointer" onClick={onStarred}>
          {starred ? (
            <BsFillStarFill
              size={15}
              className={isDarkMode ? "text-yellow-400" : "text-red-600"}
            />
          ) : (
            <BsStar size={15} className={isDarkMode ? "text-gray-300" : ""} />
          )}
        </div>
        <h4 className="note-title grow pl-1">{title}</h4>
        <div className="flex flex-col gap-1 cursor-pointer" onClick={onDelete}>
          <BsArchiveFill
            size={15}
            className={isDarkMode ? "text-gray-300" : ""}
          />
        </div>
      </div>
    );
  }
);

Note.displayName = "Note";

export default Note;
