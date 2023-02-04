import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SingleLike = ({ like, userId, blogId }) => {
  return (
    <Box my="10px" _hover={{ bg: "#385898" }} p="5px" borderRadius="10px">
      <Text fontSize="25px" fontWeight="400">
        {like.name}
      </Text>
    </Box>
  );
};

export default SingleLike;
