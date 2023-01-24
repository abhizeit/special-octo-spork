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

const intialState = {
  blogs: [],
  isLoading: false,
  isError: false,
};

const blogReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case getBlogsRequest: {
      return {
        ...intialState,
        isLoading: true,
        isError: false,
      };
    }
    case getBlogFail: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case getBlogsSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        blogs: [...payload],
      };
    }
    case postCommentRequest: {
      return state;
    }
    case postCommentFail: {
      return state;
    }
    case postCommentSuccess: {
      const updated = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        blogs: updated,
      };
    }
    case deleteCommentRequest: {
      return state;
    }
    case deleteCommentFail: {
      return state;
    }
    case deleteCommentSuccess: {
      const updated = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        blogs: updated,
      };
    }

    case postBlogsFail: {
      return state;
    }
    case postBlogsRequest: {
      return state;
    }
    case postBlogsSuccess: {
      return {
        ...state,
        blogs: [payload, ...state.blogs],
      };
    }
    default: {
      return state;
    }
  }
};

export default blogReducer;
