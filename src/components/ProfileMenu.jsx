import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/auth.actions";
import { resetBlog } from "../redux/blogs/blog.actions";

const ProfileMenu = () => {
  const { token } = useSelector((store) => store.auth);
  const { name } = jwtDecode(token);
  const dispatch = useDispatch();
  return (
    <Menu>
      <MenuButton variant="unstyled">
        <Icon as={RxAvatar} h={8} w={8} />
      </MenuButton>
      <MenuList
        bg="blackAlpha.900"
        color="whitAlpha.800"
        backdropFilter="auto"
        backdropBlur="lg"
      >
        <MenuItem bg="none">{name}</MenuItem>
        <MenuItem bg="none">
          <Button
            variant="unstyled"
            onClick={() => {
              dispatch(logout());
              dispatch(resetBlog());
            }}
          >
            {" "}
            Logout
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
