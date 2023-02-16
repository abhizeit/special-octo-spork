import { Box, Text, SlideFade } from "@chakra-ui/react";
import React from "react";

const SingleLike = ({ like }) => {
  return (
    <SlideFade in offsetY="20px">
      <Box my="10px" _hover={{ bg: "#385898" }} p="5px" borderRadius="10px">
        <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
          {like.name}
        </Text>
      </Box>
    </SlideFade>
  );
};

export default SingleLike;
