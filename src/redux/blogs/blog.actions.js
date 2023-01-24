import axios from "axios";
import {
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
} from "./blog.types";
import { axios_instance } from "../../utils/axios_instance";

const api = process.env.REACT_APP_BASE_URI;
console.log(api);

export const getBlogs = () => async (dispatch) => {
  dispatch({ type: getBlogsRequest });
  const { data } = await axios.get(`${api}/blogs`);
  if (data.error) {
    return dispatch({ type: getBlogFail });
  }
  dispatch({ type: getBlogsSuccess, payload: data });
};

export const postComment = (payload) => async (dispatch) => {
  console.log(payload);
  dispatch({ type: postCommentRequest });
  const { data } = await axios_instance.post(
    `${api}/blogs/comments`,
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
    `${api}/blogs/comments`,
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

export const postBlog = (payload) => async (dispatch) => {
  dispatch({ type: postBlogsRequest });
  console.log("post received");
  const { data } = await axios_instance.post(
    `${api}/blogs/post`,
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
  dispatch({ type: postBlogsSuccess, payload: data.blog });
};
