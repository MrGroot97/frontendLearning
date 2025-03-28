import { Comment as CommentBox } from "./comment";
import { nestedCommentsData } from "./staticData";

export const NestedComments = () => {
    return (
        <div className="pl-10 relative">
            {nestedCommentsData.map((comment) => {  
                return <CommentBox key={comment.id} data={comment} />;
            })}
        </div>
    )
};
