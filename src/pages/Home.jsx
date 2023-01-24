import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";

import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";

import { AiFillFire, AiFillHeart, AiFillHome } from "react-icons/ai";
import { Link as ReachLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import { getBlogs, postBlog } from "../redux/blogs/blog.actions";

const Home = () => {
  const [post, setPost] = useState({ title: "", article: "" });
  const user = jwtDecode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { blogs, isError, isLoading } = useSelector((store) => store.blog);
  const { isAuth, token } = useSelector((store) => store.auth);
  const handleInputChange = (e) => {
    console.log(e.target.name);
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setPost({ title: "", article: "" });
    dispatch(postBlog({ title: post.title, article: post.article, token }));
  };
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  return (
    <Box>
      <Flex>
        <Sidebar />
        <Box
          maxH="100vh"
          h="100vh"
          width="100%"
          overflowY="scroll"
          padding="4rem"
          bg="rgb(0 0 0 / 91%)"
          color="whiteAlpha.400"
        >
          <Box textAlign="center" fontFamily="cursive" fontSize="35px">
            Daily Blogs
          </Box>
          <Box
            padding="2rem"
            border="1px solid "
            borderColor="gray.400"
            borderRadius="15px"
            bg="blackAlpha.900"
          >
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={post.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Article</FormLabel>
              <Textarea
                name="article"
                value={post.article}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <Button
              my={4}
              colorScheme="messenger"
              name="article"
              value={post.value}
              onClick={handleArticleSubmit}
            >
              Post Article
            </Button>
          </Box>
          <Text as="b" fontSize="15px">
            Read Blogs
          </Text>
          {blogs?.map((blog) => (
            <Box
              bg="blackAlpha.900"
              borderBottom="1px solid "
              borderColor="gray.400"
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
              <CommentBox id={blog._id} />
              {blog.comments?.map((comment) => (
                <Box key={comment._id}>
                  <Comment comment={comment} blog={blog} userId={user.id} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Flex>
      <HStack
        paddingX={6}
        spacing="auto"
        position="absolute"
        bottom="0"
        h=" 3rem"
        w="100%"
        display={["flex", "flex", "none", "none"]}
      >
        <Link as={ReachLink} to="">
          <Icon as={AiFillHome} color="whiteAlpha.400" fontSize="35px" />
        </Link>
        <Link as={ReachLink} to="">
          <Icon as={AiFillFire} color="whiteAlpha.400" fontSize="35px" />
        </Link>
        <Link as={ReachLink} to="">
          <Icon as={AiFillHeart} color="whiteAlpha.400" fontSize="35px" />
        </Link>
        <Link as={ReachLink} to="">
          <Icon as={AiFillHeart} color="whiteAlpha.400" fontSize="35px" />
        </Link>
        <Link as={ReachLink} to="">
          <Icon as={AiFillHeart} color="whiteAlpha.400" fontSize="35px" />
        </Link>
      </HStack>
    </Box>
  );
};

export default Home;
