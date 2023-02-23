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
  updateBlogsRequest,
  updateBlogsSuccess,
  updateBlogsFail,
} from "./blog.types";
import { axios_instance } from "../../utils/axios_instance";

const api = process.env.REACT_APP_BASE_URI;

export const getBlogs = () => async (dispatch) => {
  dispatch({ type: getBlogsRequest });
  const { data } = await axios.get(`${api}/blogs`);
  if (data.error) {
    return dispatch({ type: getBlogFail });
  }
  dispatch({ type: getBlogsSuccess, payload: data });
};

export const postBlog =
  ({ title, article, image, socket, token }) =>
  async (dispatch) => {
    dispatch({ type: postBlogsRequest });
    const { data } = await axios_instance.post(
      `${api}/blogs`,
      { title, article, image },
      {
        headers: {
          authorization: token,
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
    const { data } = await axios.delete(`${api}/blogs/${payload.id}`, {
      headers: {
        authorization: payload.token,
      },
    });
    if (!data.error) {
      dispatch({ type: deleteBlogsSuccess, payload: payload.id });
      payload.socket.emit("delete-blog", payload.id);
    } else {
      dispatch({ type: deleteBlogsFail });
    }
  } catch (e) {
    dispatch({ type: deleteBlogsFail });
  }
};

export const updateBlog = (payload) => async (dispatch) => {
  dispatch({ type: updateBlogsRequest });
  try {
    const { data } = await axios_instance.patch(
      `${api}/blogs/${payload.id}`,
      {
        title: payload.title,
        article: payload.article,
      },
      {
        headers: {
          authorization: payload.token,
        },
      }
    );
    if (!data.error) {
      dispatch({ type: updateBlogsSuccess, payload: data.blog });
      payload.socket.emit("update-blog", data.blog);
    } else {
      dispatch({ type: updateBlogsFail });
    }
  } catch (e) {
    console.log(e.message);
    dispatch({ type: updateBlogsFail });
  }
};

export const postComment = (payload) => async (dispatch) => {
  dispatch({ type: postCommentRequest });
  try {
    const { data } = await axios_instance.post(
      `${api}/comments`,
      { blogId: payload.id, comment: payload.comment },
      {
        headers: {
          authorization: payload.token,
        },
      }
    );
    if (data.error) {
      return dispatch({ type: postCommentFail });
    } else if (!data.error) {
      dispatch({ type: postCommentSuccess, payload: data.blogPost });
      payload.socket.emit("new-comment", data.blogPost);
    }
  } catch (error) {
    return dispatch({ type: postCommentFail });
  }
};

export const deleteComment = (payload) => async (dispatch) => {
  dispatch({ type: deleteCommentRequest });
  const { data } = await axios_instance.patch(
    `${api}/comments`,
    { blogId: payload.blogId, commentId: payload.commentId },
    {
      headers: {
        authorization: payload.token,
      },
    }
  );
  if (data.error) {
    return dispatch({ type: deleteCommentFail });
  }
  dispatch({ type: deleteCommentSuccess, payload: data.blogPost });
  payload.socket.emit("delete-comment", data.blogPost);
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
    if (!data.error) {
      dispatch({ type: addLikeSucees, payload: data.data });
      payload.socket.emit("add-like", data.data);
    } else {
      dispatch({ type: addLikeFail });
    }
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
    if (!data.error) {
      dispatch({ type: removeLikeSuccess, payload: data.data });
      payload.socket.emit("remove-like", data.data);
    } else {
      dispatch({ type: removeLikeFail });
    }
  } catch (error) {
    dispatch({ type: removeLikeFail });
  }
};

export const resetBlog = () => ({ type: blogReset });
