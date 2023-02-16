import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import React from "react";
import { deleteBlog } from "../redux/blogs/blog.actions";

const BlogDeleteModal = ({ id, token, socket }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBlogDelete = () => {
    dispatch(deleteBlog({ id, token, socket }));
  };
  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        type="submit"
        variant="unstyled"
        fontSize="20px"
        w="100%"
        color="whiteAlpha.800"
        _hover={{ color: "red" }}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="whiteAlpha.200"
          backdropFilter="auto"
          backdropBlur="3px"
        />
        <ModalContent bg="black" color="white" mx="10px" padding={3}>
          <ModalBody color="whiteAlpha.800">
            <Text textAlign="center" fontWeight="600" fontSize="25px" mt="10px">
              {" "}
              Are you sure you want to delete?
            </Text>
            <Flex justify="center" gap="10px">
              <Button
                fontWeight="600"
                fontSize="20px"
                variant="unstyled"
                _hover={{ color: "red" }}
                onClick={handleBlogDelete}
              >
                Delete
              </Button>
              <Button
                fontWeight="600"
                fontSize="20px"
                variant="unstyled"
                ml={6}
                _hover={{ color: "blue" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogDeleteModal;
