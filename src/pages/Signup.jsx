import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      let { data } = await axios.post(
        `http://localhost:8080/users/signup`,
        values
      );
      if (!data.error) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rToken", data.rToken);
        navigate("/");
      }
    },
  });
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
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
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
            bg="black"
            _hover={{ bg: "gray" }}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
