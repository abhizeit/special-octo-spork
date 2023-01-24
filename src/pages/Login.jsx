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
} from "@chakra-ui/react";
import { useFormik } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading, isError } = useSelector((store) => store.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(login(values));
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
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
              minLength="6"
            />
          </FormControl>

          <Button
            type="submit"
            mt={4}
            width="100%"
            bg="black"
            _hover={{ bg: "blackAlpha.500" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
