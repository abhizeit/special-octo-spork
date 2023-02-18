import { Box, Flex } from "@chakra-ui/react";

import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import { getBlogs } from "../redux/blogs/blog.actions";
import Blog from "../components/Blog";
import BottomBar from "../components/BottomBar";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((store) => store.blog);
  const { token } = useSelector((store) => store.auth);
  const user = token ? jwtDecode(token) : null;

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
          p={["1rem", "1rem", "2rem"]}
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
