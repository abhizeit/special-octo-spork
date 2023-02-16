import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import CommentModal from "./CommentModal";
import LIkeModal from "./LIkeModal";

import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../redux/blogs/blog.actions";
import { SocketContext } from "../context/SocketContext";
import { Link as ReachLink } from "react-router-dom";
import BlogMenu from "./BlogMenu";

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
        {user && blog.author._id === user.id && (
          <BlogMenu id={blog._id} token={token} socket={socket} />
          // <IconButton
          //   color="whiteAlpha.800"
          //   fontWeight="hairline"
          //   _hover={{ color: "blue" }}
          //   onClick={() =>
          //     dispatch(deleteBlog({ id: blog._id, token, socket }))
          //   }
          //   icon={<AiOutlineDelete fontSize="30px" />}
          //   variant="unstyled"
          // />
        )}
      </Flex>
      <Link
        as={ReachLink}
        to={`/viewblog/${blog._id}`}
        _hover={{ textDecoration: "none" }}
      >
        <Image src={blog.image} objectFit="cover" w="100%" h="40vh" mt="20px" />
        <Text fontSize="40px" fontWeight="600" color="whiteAlpha.800">
          {blog.title}
        </Text>
        <Text fontSize="20px" color="whiteAlpha.800" fontWeight="200">
          {blog.article.substring(0, 200)}
          {blog.article.length > 200 ? "..." : ""}
        </Text>
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
