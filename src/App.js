import { Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { SocketContext } from "./context/SocketContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { postBlogsSuccess } from "./redux/blogs/blog.types";

function App() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("new-blog", (data) => {
      dispatch({ type: postBlogsSuccess, payload: data });
    });
  }, []);
  return <AppRoutes />;
}

export default App;
