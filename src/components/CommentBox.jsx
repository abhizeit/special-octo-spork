import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../redux/blogs/blog.actions";

const CommentBox = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  function handleComment(e) {
    setComment(e.target.value);
  }
  async function hadleSubmit(e) {
    e.preventDefault();
    dispatch(postComment({ comment, id, token }));
  }

  return (
    <Box>
      <form onSubmit={hadleSubmit}>
        <Input
          placeholder="Your comment goes here"
          name="comment"
          value={comment}
          onChange={handleComment}
        />
        <Button my={4} size="sm" type="submit" colorScheme="messenger">
          comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentBox;
