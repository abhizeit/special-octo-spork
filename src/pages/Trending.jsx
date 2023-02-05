import React from "react";
import { Box, Flex, HStack, Icon, Link } from "@chakra-ui/react";

import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import { AiFillFire, AiFillHeart, AiFillHome } from "react-icons/ai";
import { Link as ReachLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Blog from "../components/Blog";
import { useState } from "react";
import { getBlogs } from "../redux/blogs/blog.actions";

const Trending = () => {
  const { token } = useSelector((store) => store.auth);
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const user = jwtDecode(token);
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const sortedBlogs = blogs.sort((a, b) => b.likesCount - a.likesCount);
    setTrending(sortedBlogs);
  }, [blogs]);

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
          {trending?.map((blog) => (
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

export default Trending;
