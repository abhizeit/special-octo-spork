import {
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineFire, AiOutlineHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth.actions";
import { resetBlog } from "../redux/blogs/blog.actions";
import jwtDecode from "jwt-decode";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { name } = jwtDecode(token);
  return (
    <Box
      h="100vh"
      minW={{ lg: "20vw", md: "30vw" }}
      bg="black"
      display={["none", "none", "block", "block"]}
      position="relative"
      top={0}
      left={0}
    >
      <Box p={4}>
        <Box align="start" p={6} position="relative">
          <Text fontWeight="500" fontSize="30px" mt="2rem" color="white">
            Daily Blogs
          </Text>
          <List color="whiteAlpha.800" fontWeight="400" fontSize="25px">
            <ListItem my={8}>
              <Link as={ReachLink} to="/">
                <ListIcon as={AiOutlineHome} mr={3} size="40px" />
                Home
              </Link>
            </ListItem>
            <ListItem my={8}>
              <Link as={ReachLink} to="/trending">
                <ListIcon as={AiOutlineFire} mr={4} size="40px" />
                Trending
              </Link>
            </ListItem>

            <ListItem my={8}>
              <Link as={ReachLink} to="/write">
                <ListIcon as={BsPencil} mr={3} size="40px" /> Write
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box position="absolute" bottom="10" left="10" w="80%">
        <Flex fontSize="25px" color="whiteAlpha.800" mb="10px">
          <RxAvatar size="40px" />
          <Text ml={3}>{name}</Text>
        </Flex>
        <Button
          colorScheme="facebook"
          width="100%"
          onClick={() => {
            dispatch(logout());
            dispatch(resetBlog());
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
