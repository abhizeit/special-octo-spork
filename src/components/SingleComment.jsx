import { Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/blogs/blog.actions";

const SingleComment = ({ comment, blogAuthor, blogId, userId }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  function handleClick() {
    const details = {
      blogId,
      commentId: comment._id,
      token,
    };
    dispatch(deleteComment(details));
  }
  console.log(userId);
  return (
    <Box my="10px" _hover={{ bg: "#385898" }} p="5px" borderRadius="10px">
      <Flex gap="10px">
        <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
          {comment.commentAuthor.name}
        </Text>
        <Spacer />
        {console.log(comment.commentAuthor._id, blogAuthor, userId)}
        {comment.commentAuthor._id === userId || blogAuthor === userId ? (
          <IconButton
            size="15px"
            variant="unstyled"
            as={AiOutlineDelete}
            cursor="pointer"
            onClick={handleClick}
          />
        ) : null}
      </Flex>

      <Text fontSize="15px" fontWeight="200" color="whiteAlpha.800">
        {comment.commentString}
      </Text>
    </Box>
  );
};

export default SingleComment;
