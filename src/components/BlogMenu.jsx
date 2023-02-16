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
        as={IconButton}
        icon={<BiDotsVerticalRounded size="md" />}
        variant="unstyled"
      />

      <MenuList bg="black">
        <MenuItem bg="transparent">
          <BlogDeleteModal id={id} token={token} socket={socket} />
        </MenuItem>
        <MenuItem bg="transparent">
          <Button
            w="100%"
            variant="unstyled"
            color="whiteAlpha.800"
            fontSize="20px"
          >
            Edit
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BlogMenu;
