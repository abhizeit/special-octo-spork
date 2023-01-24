import socket from "../utils/socket";
import { createContext } from "react";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
