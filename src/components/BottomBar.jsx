import React from "react";
import { Link } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { AiOutlineFire, AiOutlineHome } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HStack, Icon } from "@chakra-ui/react";
import ProfileMenu from "./ProfileMenu";

const linkData = [
  {
    icon: AiOutlineHome,
    link: "/",
  },
  {
    icon: AiOutlineFire,
    link: "/trending",
  },
  {
    icon: BsPencil,
    link: "/write",
  },
];

const BottomBar = () => {
  return (
    <HStack
      paddingX={6}
      spacing="auto"
      position="absolute"
      bottom="0"
      h=" 3rem"
      w="100%"
      bg="whiteAlpha.200"
      backdropFilter="auto"
      backdropBlur="xl"
      display={["flex", "flex", "none", "none"]}
      color="whiteAlpha.800"
    >
      {linkData?.map((el) => (
        <Link key={el.link} as={ReachLink} to={el.link}>
          <Icon as={el.icon} h={8} w={8} />
        </Link>
      ))}
      <ProfileMenu />
    </HStack>
  );
};

export default BottomBar;
