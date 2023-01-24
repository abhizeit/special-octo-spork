import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { BsFillHeartFill, BsFolderFill, BsStopwatchFill } from "react-icons/bs";
import { RiBillFill, RiTeamFill } from "react-icons/ri";
import { AiFillFire } from "react-icons/ai";
const Sidebar = () => {
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
        <Box align="start" p={6}>
          <Text fontWeight="500" fontSize="40px" mt="2rem" color="white">
            Blogs
          </Text>
          <List color="white" fontWeight="350" fontSize="25px">
            <ListItem my={8}>
              <Link as={ReachLink} to="">
                <ListIcon as={AiFillFire} mr={4} />
                Trending
              </Link>
            </ListItem>
            <ListItem my={8}>
              <Link as={ReachLink} to="">
                <ListIcon as={BsFillHeartFill} mr={4} />
                Favourites
              </Link>
            </ListItem>
            <ListItem my={8}>
              <Link as={ReachLink} to="">
                <ListIcon as={BsFolderFill} mr={3} /> Tasks
              </Link>
            </ListItem>
            <ListItem my={8}>
              <Link as={ReachLink} to="">
                <ListIcon as={RiTeamFill} mr={3} /> Saved
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
