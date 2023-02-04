import { Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import CommentModal from "./CommentModal";
import LikeModal from "./LikeModal";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../redux/blogs/blog.actions";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  return (
    <Box
      bg="blackAlpha.900"
      borderRadius="15px"
      my={5}
      key={blog._id}
      padding="2rem"
      width="100%"
    >
      <Flex>
        <Text fontSize="20px" fontWeight="400" color="white">
          {blog.author.name}
        </Text>
        <Spacer />
        {blog.author._id === user.id && (
          <IconButton
            variant="unstyled"
            as={AiOutlineDelete}
            size="sm"
            _hover={{ color: "white" }}
            cursor="pointer"
            onClick={() => dispatch(deleteBlog({ id: blog._id, token }))}
          />
        )}
      </Flex>

      <Text fontSize="40px" fontWeight="600" color="whiteAlpha.800">
        {blog.title}
      </Text>
      <Text fontSize="20px" color="whiteAlpha.500" fontWeight="200">
        {blog.article}
      </Text>
      <Flex gap="10px">
        <LikeModal likes={blog.likes} blogId={blog._id} userId={user.id} />
        <CommentModal
          comments={blog.comments}
          blogId={blog._id}
          blogAuthor={blog.author._id}
          userId={user.id}
        />
      </Flex>
    </Box>
  );
};

export default Blog;
