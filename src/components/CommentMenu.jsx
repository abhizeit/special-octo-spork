import React from "react";
import { Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";

import CommentDeleteModal from "./CommentDeleteModal";

import { BiDotsVerticalRounded } from "react-icons/bi";

const CommentMenu = ({ handleClick }) => {
  return (
    <Menu>
      <MenuButton
        color="whiteAlpha.800"
        aria-label="blog-menu"
        as={IconButton}
        icon={<BiDotsVerticalRounded fontSize="30px" />}
        variant="unstyled"
      />
      <MenuList bg="black" border="none">
        <CommentDeleteModal handleCommentDelete={handleClick} />
      </MenuList>
    </Menu>
  );
};

export default CommentMenu;
