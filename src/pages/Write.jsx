import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { postBlog } from "../redux/blogs/blog.actions";
import Sidebar from "../components/Sidebar";
import BottomBar from "../components/BottomBar";
import { imageUpload } from "../utils/imageUpload";
import useLoginAlert from "../hooks/loginAlert";

export default function Write() {
  const { token } = useSelector((store) => store.auth);
  const { isLoading } = useSelector((store) => store.blog);
  const [post, setPost] = useState({ title: "", article: "" });
  const [file, setFile] = useState(null);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { loginAlert } = useLoginAlert();
  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return loginAlert();
    }
    const image = (await imageUpload(file)) || null;
    if (image) {
      dispatch(
        postBlog({
          title: post.title,
          article: post.article,
          image,
          token,
          socket,
        })
      );
    } else {
      console.log("error happened");
    }
    setPost({ title: "", article: "" });
  };

  return (
    <Box>
      <Flex>
        <Sidebar />
        <Center bg="blackAlpha.900" h="100vh" w="100%">
          <Box
            padding="2rem"
            borderRadius="10px"
            width={["80%", "70%", "60%", "50%"]}
            m="auto"
            bg="black"
          >
            <FormControl>
              <FormLabel color="whiteAlpha.800" as="b">
                Title
              </FormLabel>
              <Input
                p="5px"
                mb="10px"
                variant="unstyled"
                type="text"
                name="title"
                color="whiteAlpha.800"
                value={post.title}
                onChange={handleInputChange}
                placeholder="Yout title goes here"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="whiteAlpha.800" as="b">
                Article
              </FormLabel>
              <Textarea
                p="5px"
                mb="10px"
                variant="unstyled"
                color="whiteAlpha.800"
                name="article"
                value={post.article}
                onChange={handleInputChange}
                placeholder="Your body goes here"
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel color="whiteAlpha.800" as="b">
                Pick an image
              </FormLabel>
              <Input
                mb="10px"
                p="5px"
                variant="unstyled"
                type="file"
                accept="image/*"
                color="whiteAlpha.800"
                onChange={(e) => setFile(e.target.files[0])}
                sx={{
                  "::file-selector-button": {
                    height: 10,
                    padding: 0,
                    mr: 4,
                    color: "blue",
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                  },
                }}
              />
            </FormControl>{" "}
            <Button
              loadingText="Posting"
              isLoading={isLoading}
              w="100%"
              fontSize="20px"
              my={4}
              colorScheme="facebook"
              name="article"
              value={post.value}
              onClick={handleArticleSubmit}
            >
              Post Article
            </Button>
          </Box>
        </Center>
      </Flex>
      <BottomBar />
    </Box>
  );
}
