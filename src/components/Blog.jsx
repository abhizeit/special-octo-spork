import { Box, Text } from "@chakra-ui/react";
import React from "react";
import CommentModal from "./CommentModal";

const Blog = ({ blog, user }) => {
  return (
    <Box
      bg="blackAlpha.900"
      borderRadius="15px"
      my={5}
      key={blog._id}
      padding="2rem"
      width="100%"
    >
      <Text fontSize="30px" fontWeight="600" color="white">
        {blog.author.name}
      </Text>
      <Text fontSize="25px" fontWeight="700" color="whiteAlpha.800">
        {blog.title}
      </Text>
      <Text fontSize="20px" color="whiteAlpha.500">
        {blog.article}
      </Text>
      <CommentModal
        comments={blog.comments}
        blogId={blog._id}
        blogAuthor={blog.author._id}
        userId={user.id}
      />
    </Box>
  );
};

export default Blog;
