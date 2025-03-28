import { forwardRef } from "react";
import { BsArchiveFill, BsFillStarFill, BsStar } from "react-icons/bs";

const Note = forwardRef(
    ({ note, onDelete = () => void 0, onStarred = () => void 0, ...props }, ref) => {
        const { title, position, starred } = note;

        return (
            <div
                className="absolute bg-yellow-200 min-w-[300px] rounded-md p-2 flex items-center justify-between select-none cursor-move"
                style={{ top: position?.y, left: position?.x }}
                ref={ref}
                {...props}
            >
                <div
                    className="flex flex-col gap-1 cursor-pointer"
                    onClick={onStarred}
                >
                    {starred ? (
                        <BsFillStarFill size={15} className="text-red-600" />
                    ) : (
                        <BsStar size={15} />
                    )}
                </div>
                <h4 className="note-title grow pl-1">{title}</h4>
                <div
                    className="flex flex-col gap-1 cursor-pointer"
                    onClick={onDelete}
                >
                    <BsArchiveFill size={15} />
                </div>
            </div>
        );
    }
);

Note.displayName = "Note";

export default Note;
