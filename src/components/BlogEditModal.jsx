import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Textarea,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../redux/blogs/blog.actions";

const BlogEditModal = ({ blog, token, socket }) => {
  const [post, setPost] = useState({ ...blog });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleBlogUpdate = () => {
    dispatch(
      updateBlog({
        id: blog._id,
        token,
        socket,
        title: post.title,
        article: post.article,
      })
    );
    onClose();
  };

  return (
    <>
      <>
        <Button
          onClick={onOpen}
          my={4}
          mb="0"
          size="sm"
          type="submit"
          variant="unstyled"
          fontSize="20px"
          w="100%"
          color="whiteAlpha.800"
          _hover={{ color: "blue" }}
        >
          Edit
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="whiteAlpha.200"
            backdropFilter="auto"
            backdropBlur="3px"
          />
          <ModalContent bg="black" color="white" mx="10px">
            <ModalBody
              maxH="60vh"
              overflowY="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "blue",
                  borderRadius: "24px",
                },
              }}
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
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="unstyled"
                _hover={{ color: "green" }}
                mr="30px"
                onClick={handleBlogUpdate}
              >
                Update
              </Button>
              <Button
                variant="unstyled"
                onClick={onClose}
                _hover={{ color: "blue" }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default BlogEditModal;

//   <form onSubmit={handleSubmit}>
//     <InputGroup>
//       <Input
//         pr="4.5rem"
//         type="text"
//         placeholder="your comment goes here"
//         onChange={(e) => setText(e.target.value)}
//       />
//       <InputRightElement width="4.5rem">
//         <Button
//           isLoading={isLoading}
//           isDisabled={!text.length}
//           variant="unstyled"
//           fontWeight="light"
//           type="submit"
//         >
//           reply
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   </form>
