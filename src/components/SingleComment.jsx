import { Box, Flex, Spacer, Text, SlideFade, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/blogs/blog.actions";
import { SocketContext } from "../context/SocketContext";
import CommentMenu from "./CommentMenu";
import moment from "moment";

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
        <Flex>
          <Box>
            <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
              {comment.commentAuthor.name}
            </Text>
            <Tooltip
              label={`${moment(
                new Date(comment.createdAt.toLocaleString())
              ).format(" D MMM  YYYY, h:mm:ss a")}`}
            >
              <Text fontSize="12px" color="gray">
                {moment(new Date(comment.createdAt.toLocaleString())).fromNow()}
              </Text>
            </Tooltip>
          </Box>
          <Spacer />
          {(userId && comment.commentAuthor._id === userId) ||
          blogAuthor === userId ? (
            <CommentMenu handleClick={handleClick} />
          ) : null}
        </Flex>

        <Text fontSize="15px" fontWeight="200" color="whiteAlpha.800">
          {comment.commentString}
        </Text>
      </Box>
    </SlideFade>
  );
};

export default SingleComment;
