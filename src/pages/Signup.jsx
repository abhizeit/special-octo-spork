import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Link,
} from "@chakra-ui/react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singup } from "../redux/auth/auth.actions";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoading, isSignedUp } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const successToast = () =>
    toast({
      title: "Sign up Successful.",
      description: "You've been signed up succesfully!!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  const failToast = () =>
    toast({
      title: "Failed.",
      description: "Sign up failed!!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(
        singup({ payload: values, toaster: { successToast, failToast } })
      );
    },
  });

  useEffect(() => {
    if (isSignedUp) {
      navigate("/login");
    }
  }, [isSignedUp, navigate]);
  return (
    <Center h="100vh" w="100vw" bg="blackAlpha.900">
      <Box
        padding="2rem"
        width={["80%", "70%", "50%", "40%"]}
        border="3px solid black"
        borderRadius="10px"
        bg="black"
        color="whiteAlpha.800"
      >
        <Text fontSize="2.5rem" fontWeight="600" textAlign="center" m={4}>
          SIGN UP
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontFamily={"monospace"}>Email</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              minLength="6"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="facebook"
            isLoading={isLoading}
          >
            Sign up
          </Button>
        </form>
        <Text mt="10px">
          Already a user?{" "}
          <Link as={ReachLink} to="/login" color="blue.700">
            Log in.
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Signup;
