import axios from "axios";
import {
  addLikeFail,
  addLikeRequest,
  addLikeSucees,
  blogReset,
  deleteBlogsFail,
  deleteBlogsRequest,
  deleteBlogsSuccess,
  deleteCommentFail,
  deleteCommentRequest,
  deleteCommentSuccess,
  getBlogFail,
  getBlogsRequest,
  getBlogsSuccess,
  postBlogsFail,
  postBlogsRequest,
  postBlogsSuccess,
  postCommentFail,
  postCommentRequest,
  postCommentSuccess,
  removeLikeFail,
  removeLikeRequest,
  removeLikeSuccess,
} from "./blog.types";
import { axios_instance } from "../../utils/axios_instance";
import socket from "../../utils/socket";

const api = process.env.REACT_APP_BASE_URI;

export const getBlogs = () => async (dispatch) => {
  dispatch({ type: getBlogsRequest });
  const { data } = await axios.get(`${api}/blogs`);
  if (data.error) {
    return dispatch({ type: getBlogFail });
  }
  dispatch({ type: getBlogsSuccess, payload: data });
};

export const postBlog = (payload) => async (dispatch) => {
  dispatch({ type: postBlogsRequest });
  const { data } = await axios_instance.post(
    `${api}/blogs`,
    { title: payload.title, article: payload.article },
    {
      headers: {
        authorization: payload.token,
      },
    }
  );
  if (data.error) {
    return dispatch({ type: postBlogsFail });
  }
  socket.emit("new-blog", data.blog);
  dispatch({ type: postBlogsSuccess, payload: data.blog });
};

export const deleteBlog = (payload) => async (dispatch) => {
  dispatch({ type: deleteBlogsRequest });
  try {
    const { data } = await axios.delete(
      `http://localhost:8080/blogs/${payload.id}`,
      {
        headers: {
          authorization: payload.token,
        },
      }
    );
    console.log(data);
    if (!data.error) {
      dispatch({ type: deleteBlogsSuccess, payload: payload.id });
    }
  } catch (e) {
    dispatch({ type: deleteBlogsFail });
  }
};

export const postComment = (payload) => async (dispatch) => {
  console.log(payload);
  dispatch({ type: postCommentRequest });
  const { data } = await axios_instance.post(
    `${api}/comments`,
    { blogId: payload.id, comment: payload.comment },
    {
      headers: {
        authorization: payload.token,
      },
    }
  );
  console.log(data);
  if (data.error) {
    return dispatch({ type: postCommentFail });
  }
  if (!data.error) {
    return dispatch({ type: postCommentSuccess, payload: data.blogPost });
  }
};

export const deleteComment = (payload) => async (dispatch) => {
  dispatch({ type: deleteCommentRequest });
  console.log(payload);
  const { data } = await axios_instance.patch(
    `${api}/comments`,
    { blogId: payload.blogId, commentId: payload.commentId },
    {
      headers: {
        authorization: payload.token,
      },
    }
  );
  console.log(data);
  if (data.error) {
    return dispatch({ type: deleteCommentFail });
  }
  dispatch({ type: deleteCommentSuccess, payload: data.blogPost });
};

export const likeBlog = (payload) => async (dispatch) => {
  dispatch({ type: addLikeRequest });
  try {
    const { data } = await axios_instance.patch(
      `${api}/likes/likeBlog`,
      { blogId: payload.blogId, likesCount: payload.likesCount },
      {
        headers: {
          authorization: payload.token,
        },
      }
    );
    console.log(data);
    dispatch({ type: addLikeSucees, payload: data.data });
  } catch (error) {
    dispatch({ type: addLikeFail });
  }
};

export const likeRemove = (payload) => async (dispatch) => {
  dispatch({ type: removeLikeRequest });
  try {
    const { data } = await axios_instance.patch(
      `${api}/likes/unlikeBlog`,
      {
        blogId: payload.blogId,
        likesCount: payload.likesCount,
      },
      {
        headers: {
          authorization: payload.token,
        },
      }
    );
    dispatch({ type: removeLikeSuccess, payload: data.data });
  } catch (error) {
    dispatch({ type: removeLikeFail });
  }
};

export const resetBlog = () => ({ type: blogReset });
