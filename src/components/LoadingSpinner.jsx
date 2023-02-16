import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Center h="100vh" w="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="blackAlpha.800"
        color="blue"
        size="xl"
      />
    </Center>
  );
};

export default LoadingSpinner;
