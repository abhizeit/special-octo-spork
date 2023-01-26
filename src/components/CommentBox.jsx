import { Box, Button, Flex, Input, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../redux/blogs/blog.actions";
import CommentModal from "./CommentModal";

const CommentBox = ({ blogId, comments, blogAuthor, userId }) => {
  return (
    <Box>
      <Flex gap="20px">
        <Button
          my={4}
          size="sm"
          type="submit"
          colorScheme="facebook"
          fontSize="20px"
          w="100%"
        >
          Like
        </Button>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default CommentBox;
