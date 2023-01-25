import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SingleComment from "./SingleComment";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../redux/blogs/blog.actions";

const CommentModal = ({ comments, id }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleComment = () => {
    console.log(id);
    dispatch(postComment({ comment: text, id, token }));
  };
  return (
    <>
      <>
        <Button
          onClick={onOpen}
          my={4}
          size="sm"
          type="submit"
          colorScheme="facebook"
          fontSize="20px"
          w="100%"
        >
          Comments
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="whiteAlpha.200"
            backdropFilter="auto"
            backdropBlur="3px"
          />
          <ModalContent bg="black" color="white">
            <ModalHeader>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="your comment goes here"
                  onChange={(e) => setText(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    isDisabled={!text.length}
                    variant="unstyled"
                    colorSheme="facebook"
                    fontWeight="light"
                    onClick={handleComment}
                  >
                    reply
                  </Button>
                </InputRightElement>
              </InputGroup>
            </ModalHeader>
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
              {comments?.map((comment) => (
                <SingleComment
                  name={comment.commentAuthor.name}
                  comment={comment.commentString}
                />
              ))}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" colorScheme="facebook" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default CommentModal;
