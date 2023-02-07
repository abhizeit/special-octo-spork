import { useContext, useEffect } from "react";
import { SocketContext } from "./context/SocketContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import {
  addLikeSucees,
  deleteBlogsSuccess,
  deleteCommentSuccess,
  postBlogsSuccess,
  postCommentSuccess,
  removeLikeSuccess,
} from "./redux/blogs/blog.types";

function App() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("new-blog", (data) => {
      dispatch({ type: postBlogsSuccess, payload: data });
    });
    socket.on("delete-blog", (data) => {
      dispatch({ type: deleteBlogsSuccess, payload: data });
    });
    socket.on("new-comment", (data) => {
      dispatch({ type: postCommentSuccess, payload: data });
    });
    socket.on("delete-comment", (data) => {
      dispatch({ type: deleteCommentSuccess, payload: data });
    });
    socket.on("add-like", (data) => {
      dispatch({ type: addLikeSucees, payload: data });
    });
    socket.on("remove-like", (data) => {
      dispatch({ type: removeLikeSuccess, payload: data });
    });
  }, []);
  return <AppRoutes />;
}

export default App;
