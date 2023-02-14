import {
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import CommentModal from "./CommentModal";
import LikeModal from "./LikeModal";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../redux/blogs/blog.actions";
import { SocketContext } from "../context/SocketContext";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { socket } = useContext(SocketContext);
  return (
    <Box
      bg="blackAlpha.900"
      borderRadius="10px"
      my={5}
      key={blog._id}
      padding="2rem"
      width="100%"
    >
      <Flex>
        <VStack>
          <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
            {blog.author.name}
          </Text>
          <Text fontSize="12px" color="gray">
            {new Date(blog.createdAt.toLocaleString()).toLocaleString("es-CL")}
          </Text>
        </VStack>
        <Spacer />
        {blog.author._id === user.id && (
          <IconButton
            variant="unstyled"
            as={AiOutlineDelete}
            size="sm"
            _hover={{ color: "white" }}
            cursor="pointer"
            onClick={() =>
              dispatch(deleteBlog({ id: blog._id, token, socket }))
            }
          />
        )}
      </Flex>

      <Image src={blog.image} objectFit="cover" w="100%" h="300px" />
      <Text fontSize="40px" fontWeight="600" color="whiteAlpha.800">
        {blog.title}
      </Text>
      <Text fontSize="20px" color="whiteAlpha.800" fontWeight="200">
        {blog.article}
      </Text>
      <Flex gap="10px">
        <LikeModal
          key={blog._id + user.id}
          likes={blog.likes}
          blogId={blog._id}
          userId={user.id}
          likesCount={blog.likesCount}
        />
        <CommentModal
          key={user.id + blog._id}
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
