import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SocketProvider from "./context/SocketContext";
import { BrowserRouter } from "react-router-dom";
import theme from "./utils/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
