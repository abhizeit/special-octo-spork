import { Box, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";

import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import { AiFillFire, AiFillHeart, AiFillHome } from "react-icons/ai";
import { Link as ReachLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import { getBlogs } from "../redux/blogs/blog.actions";
import Blog from "../components/Blog";
import BottomBar from "../components/BottomBar";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, isError, isLoading } = useSelector((store) => store.blog);
  const { isAuth, token } = useSelector((store) => store.auth);
  const user = jwtDecode(token);

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
          {blogs?.map((blog) => (
            <Blog key={blog._id} blog={blog} user={user} />
          ))}
        </Box>
      </Flex>
      <BottomBar />
    </Box>
  );
};

export default Home;
