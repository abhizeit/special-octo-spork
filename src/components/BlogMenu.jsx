import React from "react";
import { Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BlogDeleteModal from "./BlogDeleteModal";
import BlogEditModal from "./BlogEditModal";
const BlogMenu = ({ token, socket, blog }) => {
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
        <BlogDeleteModal id={blog._id} token={token} socket={socket} />
        <BlogEditModal blog={blog} token={token} socket={socket} />
      </MenuList>
    </Menu>
  );
};

export default BlogMenu;
