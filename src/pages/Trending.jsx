import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Blog from "../components/Blog";
import { useState } from "react";
import { getBlogs } from "../redux/blogs/blog.actions";
import BottomBar from "../components/BottomBar";

const Trending = () => {
  const { token } = useSelector((store) => store.auth);
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const user = token ? jwtDecode(token) : null;
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
            <Blog key={blog._id} blog={blog} user={user} />
          ))}
        </Box>
      </Flex>
      <BottomBar />
    </Box>
  );
};

export default Trending;
