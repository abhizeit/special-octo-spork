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

const intialState = {
  blogs: [],
  isLoading: false,
  isError: false,
};

const blogReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case postBlogsFail: {
      return { ...state, isLoading: false, isError: true };
    }
    case postBlogsRequest: {
      return { ...state, isLoading: true, isError: false };
    }
    case postBlogsSuccess: {
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        isLoading: false,
        isError: false,
      };
    }
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

    case deleteBlogsRequest: {
      return state;
    }

    case deleteBlogsSuccess: {
      const updated = state.blogs.filter((blog) => blog._id !== payload);
      return {
        ...state,
        blogs: updated,
      };
    }

    case deleteBlogsFail: {
      return state;
    }

    case postCommentRequest: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case postCommentFail: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case postCommentSuccess: {
      const updated = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
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

    case addLikeRequest: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case addLikeSucees: {
      const updated = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        isLoading: false,
        blogs: updated,
      };
    }
    case addLikeFail: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case removeLikeRequest: {
      return { ...state, isLoading: true };
    }
    case removeLikeSuccess: {
      const updated = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        isLoading: false,
        blogs: updated,
      };
    }
    case removeLikeFail: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case blogReset: {
      return intialState;
    }
    default: {
      return state;
    }
  }
};

export default blogReducer;
