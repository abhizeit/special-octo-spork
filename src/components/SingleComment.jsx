import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/blogs/blog.actions";
import { SocketContext } from "../context/SocketContext";

const SingleComment = ({ comment, blogAuthor, blogId, userId }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  function handleClick() {
    const details = {
      blogId,
      commentId: comment._id,
      token,
      socket,
    };
    dispatch(deleteComment(details));
  }
  return (
    <SlideFade in offsetY="20px">
      <Box my="10px" _hover={{ bg: "#385898" }} p="5px" borderRadius="10px">
        <Flex gap="10px">
          <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
            {comment.commentAuthor.name}
          </Text>
          <Spacer />
          {userId &&
            (comment.commentAuthor._id === userId || blogAuthor === userId ? (
              <IconButton
                size="15px"
                variant="unstyled"
                as={AiOutlineDelete}
                cursor="pointer"
                onClick={handleClick}
              />
            ) : null)}
        </Flex>

        <Text fontSize="15px" fontWeight="200" color="whiteAlpha.800">
          {comment.commentString}
        </Text>
      </Box>
    </SlideFade>
  );
};

export default SingleComment;
