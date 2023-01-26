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
import { getBlogs, postBlog } from "../redux/blogs/blog.actions";
import CommentModal from "../components/CommentModal";
import Blog from "../components/Blog";

const Home = () => {
  const [post, setPost] = useState({ title: "", article: "" });
  const dispatch = useDispatch();
  const { blogs, isError, isLoading } = useSelector((store) => store.blog);
  const { isAuth, token } = useSelector((store) => store.auth);
  const user = jwtDecode(token);
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
          overflowY="auto"
          padding={["2rem", "3rem", "4rem"]}
          bg="rgb(0 0 0 / 91%)"
          color="whiteAlpha.400"
        >
          <Box textAlign="center" fontFamily="monospace" fontSize="35px">
            Daily Blogs
          </Box>
          <Box padding="2rem" borderRadius="10px" bg="blackAlpha.900">
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
              w="100%"
              fontSize="20px"
              my={4}
              colorScheme="facebook"
              name="article"
              value={post.value}
              onClick={handleArticleSubmit}
            >
              Post Article
            </Button>
          </Box>

          {blogs?.map((blog) => (
            <Blog blog={blog} user={user} />
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
