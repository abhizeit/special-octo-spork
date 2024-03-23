import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { useSelector } from "react-redux";
import LikeModal from "../components/LikeModal";
import CommentModal from "../components/CommentModal";
import jwtDecode from "jwt-decode";
import moment from "moment";

const ViewBlog = () => {
  const { id } = useParams();
  const { blogs } = useSelector((store) => store.blog);
  const [blog, setBlog] = useState(null);
  const { token } = useSelector((store) => store.auth);
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    blogs && setBlog(blogs.find((b) => b._id === id));
  }, [blogs, id]);

  return (
    <Box minh="100vh" bg="rgba(0,0,0,91%)">
      <Box w="90%" m="auto" py="20px " pb="70px">
        {blog && (
          <>
            <Text
              fontWeight="600"
              fontSize="2rem"
              color="whiteAlpha.800"
              mb="10px"
            >
              {blog.author.name}
            </Text>
            <Text fontSize="1rem" color="gray" mb="10px">
              {moment(new Date(blog.createdAt.toLocaleString())).format(
                " D MMM YYYY, h:mm:ss a"
              )}
            </Text>
            <Image
              src={blog.image}
              w="100%"
              h="60vh"
              objectFit="cover"
              mb="10px"
            />

            <Text
              fontWeight="800"
              fontSize="2rem"
              color="whiteAlpha.800"
              mb="10px"
            >
              {blog.title}
            </Text>
            <Text
              fontWeight="200"
              fontSize="1.5rem"
              color="whiteAlpha.800"
              mb="10px"
            >
              {blog.article}
            </Text>
            <Flex gap="10px">
              <LikeModal
                key={blog._id + "like"}
                likes={blog.likes}
                blogId={blog._id}
                userId={user ? user.id : null}
                likesCount={blog.likesCount}
              />
              <CommentModal
                key={blog._id + "comment"}
                comments={blog.comments}
                blogId={blog._id}
                blogAuthor={blog.author._id}
                userId={user ? user.id : null}
              />
            </Flex>
          </>
        )}
      </Box>

      <BottomBar />
    </Box>
  );
};

export default ViewBlog;
