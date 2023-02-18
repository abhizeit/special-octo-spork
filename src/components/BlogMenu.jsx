import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BlogDeleteModal from "./BlogDeleteModal";
const BlogMenu = ({ id, token, socket }) => {
  return (
    <Menu>
      <MenuButton
        color="whiteAlpha.800"
        aria-label="blog-menu"
        as={IconButton}
        icon={<BiDotsVerticalRounded fontSize="30px" />}
        variant="unstyled"
      />

      <MenuList bg="black">
        <BlogDeleteModal id={id} token={token} socket={socket} />
        <Button
          w="100%"
          variant="unstyled"
          color="whiteAlpha.800"
          fontSize="20px"
        >
          Edit
        </Button>
      </MenuList>
    </Menu>
  );
};

export default BlogMenu;
