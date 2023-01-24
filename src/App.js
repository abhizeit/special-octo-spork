import { Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { SocketContext } from "./context/SocketContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { socket } = useContext(SocketContext);

  return <AppRoutes />;
}

export default App;
