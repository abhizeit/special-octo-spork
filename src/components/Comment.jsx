import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/blogs/blog.actions";
const Comment = ({ comment, blog, userId }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  function handleClick() {
    const details = {
      blogId: blog._id,
      commentId: comment._id,
      token,
    };
    dispatch(deleteComment(details));
  }
  return (
    <Box py={6}>
      <Text fontSize="16px" fontWeight="600" color="white">
        {comment.commentAuthor.name}
      </Text>
      <Text color="whiteAlpha.700">{comment.commentString}</Text>
      {comment.commentAuthor._id === userId || blog.author._id === userId ? (
        <Button
          colorScheme="whatsapp"
          color="black"
          my={4}
          onClick={handleClick}
        >
          delete
        </Button>
      ) : null}
    </Box>
  );
};

export default Comment;
