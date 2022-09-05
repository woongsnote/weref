/** 댓글 리스트 */
import { Box } from "@mui/material";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  const currentUserId = "tester1";
  // const currentUserId = "";
  return (
    <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
      {/* 새 댓글 추가 */}
      <AddComment currentUserId={currentUserId} postId={1} />
      {/* 가져온 댓글 목록 */}
      {comments.length === 0 ? <Box>아직 댓글이 없어요</Box> : null}

      {comments.map((comment) => {
        return (
          <Comment
            key={comment.writer}
            author={comment.writer}
            content={comment.comment}
            currentUserId={currentUserId}
          />
        );
      })}
    </Box>
  );
};

export default CommentList;