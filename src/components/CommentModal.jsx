import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import SingleComment from "./SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../redux/blogs/blog.actions";
import { SocketContext } from "../context/SocketContext";
import useLoginAlert from "../hooks/loginAlert";

const CommentModal = ({ comments, blogId, userId, blogAuthor }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const { socket } = useContext(SocketContext);
  const { loginAlert } = useLoginAlert();
  const { token } = useSelector((store) => store.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return loginAlert();
    else dispatch(postComment({ comment: text, id: blogId, token, socket }));
  };
  return (
    <>
      <>
        <Button
          onClick={onOpen}
          my={4}
          size="sm"
          type="submit"
          variant="unstyled"
          fontSize="20px"
          w="100%"
          fontWeight="hairline"
          color="#3b7af7"
        >
          {comments.length === 1
            ? "1 Comment"
            : comments.length > 1
            ? `${comments.length} Comments`
            : "Comment"}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="whiteAlpha.200"
            backdropFilter="auto"
            backdropBlur="3px"
          />
          <ModalContent bg="black" color="white" mx="10px">
            <ModalHeader>
              <form onSubmit={handleSubmit}>
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
                      fontWeight="light"
                      type="submit"
                    >
                      reply
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </form>
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
                  key={comment._id}
                  comment={comment}
                  blogId={blogId}
                  userId={userId}
                  blogAuthor={blogAuthor}
                />
              ))}
            </ModalBody>
            <ModalFooter>
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

export default CommentModal;
