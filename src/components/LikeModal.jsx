import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, likeRemove } from "../redux/blogs/blog.actions";
import SingleLike from "./SingleLike";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeModal = ({ likes, blogId, userId, likesCount }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLike = () => {
    likes.find((el) => el._id === userId)
      ? dispatch(likeRemove({ blogId, token, likesCount: likesCount - 1 }))
      : dispatch(likeBlog({ blogId, token, likesCount: likesCount + 1 }));
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
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
        {likesCount > 0 ? likesCount : null} {likesCount > 1 ? "Likes" : "Like"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="whiteAlpha.200"
          backdropFilter="auto"
          backdropBlur="3px"
        />
        <ModalContent bg="black" color="white">
          <ModalHeader>
            <Flex>
              <Text>Likes</Text>
              <Spacer />
              <IconButton
                onClick={handleLike}
                variant="unstyled"
                size="sm"
                color="blue"
                as={
                  likes.find((el) => el._id === userId)
                    ? AiFillHeart
                    : AiOutlineHeart
                }
              />
            </Flex>
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
            {likes.map((like) => (
              <SingleLike
                key={like._id}
                like={like}
                userId={userId}
                blogId={blogId}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="unstyled"
              onClick={onClose}
              _hover={{ color: "blue" }}
            >
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LikeModal;
