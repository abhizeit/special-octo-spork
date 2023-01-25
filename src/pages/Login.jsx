import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../redux/auth/auth.actions";
import { useNavigate } from "react-router-dom";
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
    <Center h="100vh" w="100vw" bg="black">
      <Box
        padding="2rem"
        width={["80%", "70%", "50%", "40%"]}
        border="3px solid black"
        borderRadius="10px"
        bg="gray.400"
        color="white"
      >
        <Text fontSize="3rem" fontWeight="600" textAlign="center" m={4}>
          Welcome Back!
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
            bg="black"
            _hover={{ bg: "blackAlpha.500" }}
            isLoading={isLoading}
            loadingText="Logging in"
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
