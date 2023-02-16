import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/auth.actions";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const name = token ? jwtDecode(token).name : "";
  const dispatch = useDispatch();
  const handleClick = () => {
    token ? dispatch(logout()) : navigate("/login");
  };
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
        {name && (
          <MenuItem bg="none">
            <Text>{name}</Text>
          </MenuItem>
        )}
        <MenuItem bg="none" variant="unstyled" onClick={handleClick}>
          {token ? "Logout" : "Login"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
