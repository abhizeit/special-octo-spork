import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SingleComment = ({ name, comment }) => {
  return (
    <Box my="10px" _hover={{ bg: "#385898" }} p="5px" borderRadius="10px">
      <Text fontSize="25px" fontWeight="400">
        {name}
      </Text>
      <Text fontSize="15px" fontWeight="200">
        {comment}
      </Text>
    </Box>
  );
};

export default SingleComment;
