import { Comment as CommentBox } from "./comment";
import { nestedCommentsData } from "./staticData";

export const NestedComments = () => {
    return <CommentBox data={nestedCommentsData} />;
};
