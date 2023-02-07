import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../redux/auth/auth.actions";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useFormik } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useSelector((store) => store.auth);
  const toast = useToast();
  const successToast = () =>
    toast({
      title: "Login Successful.",
      description: "You've been logged in succesfully!!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  const failToast = (msg) =>
    toast({
      title: "Login Failed",
      description: `${msg}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(
        login({ payload: values, toaster: { successToast, failToast } })
      );
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
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
          WECOME BACK
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>

          <Button
            type="submit"
            mt={4}
            width="100%"
            colorScheme="facebook"
            isLoading={isLoading}
            loadingText="Logging in"
          >
            Login
          </Button>
        </form>
        <Text mt="10px">
          New here?{" "}
          <Link as={ReachLink} to="/signup" color="blue.700">
            Sign up.
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Login;
