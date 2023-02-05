import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { postBlog } from "../redux/blogs/blog.actions";

export default function Write() {
  const { isAuth, token } = useSelector((store) => store.auth);
  const [post, setPost] = useState({ title: "", article: "" });
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    console.log(e.target.name);
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setPost({ title: "", article: "" });
    dispatch(
      postBlog({ title: post.title, article: post.article, token, socket })
    );
  };

  return (
    <Box padding="2rem" borderRadius="10px" bg="blackAlpha.900">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          color="whiteAlpha.800"
          value={post.title}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Article</FormLabel>
        <Textarea
          color="whiteAlpha.800"
          name="article"
          value={post.article}
          onChange={handleInputChange}
        />
      </FormControl>{" "}
      <Button
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
  );
}
