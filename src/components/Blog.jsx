import { Box, Flex, Image, Link, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import CommentModal from "./CommentModal";
import LIkeModal from "./LIkeModal";
import moment from "moment";

import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { Link as ReachLink } from "react-router-dom";
import BlogMenu from "./BlogMenu";

const Blog = ({ blog, user }) => {
  const { token } = useSelector((store) => store.auth);
  const { socket } = useContext(SocketContext);
  return (
    <Box
      bg="blackAlpha.900"
      borderRadius="10px"
      my={5}
      mb="50px"
      key={blog._id}
      padding="2rem"
      width="100%"
    >
      <Flex>
        <VStack align="start">
          <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
            {blog.author.name}
          </Text>
          <Text fontSize="12px" color="gray">
            {moment(new Date(blog.createdAt.toLocaleString())).format(
              "  D MMM YYYY, h:mm:ss a"
            )}
          </Text>
        </VStack>
        <Spacer />
        {user && blog.author._id === user.id && (
          <BlogMenu token={token} socket={socket} blog={blog} />
        )}
      </Flex>
      <Link
        as={ReachLink}
        to={`/viewblog/${blog._id}`}
        _hover={{ textDecoration: "none" }}
      >
        <Image
          src={blog.image}
          objectFit="cover"
          w="100%"
          h="40vh"
          mt="20px"
          alt="blog-banner"
        />
        <Text fontSize="40px" fontWeight="600" color="whiteAlpha.800">
          {blog.title}
        </Text>
        <Box fontSize="20px" color="whiteAlpha.800" fontWeight="200">
          {blog.article.substring(0, 200)}
          {blog.article.length > 200 ? "..." : ""}
        </Box>
      </Link>
      <Flex gap="10px">
        <LIkeModal
          key={blog._id + "32"}
          likes={blog.likes}
          blogId={blog._id}
          userId={user ? user.id : null}
          likesCount={blog.likesCount}
        />
        <Spacer />
        <CommentModal
          key={blog._id + "42"}
          comments={blog.comments}
          blogId={blog._id}
          blogAuthor={blog.author._id}
          userId={user ? user.id : null}
        />
      </Flex>
    </Box>
  );
};

export default Blog;
