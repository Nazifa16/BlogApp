import App from "./App.jsx";
import "./styles/global.css";

import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./store/global/GlobalProvider.jsx";

import "react-toastify/dist/ReactToastify.css"; //toastify
import { ToastContainer } from "react-toastify"; //toast container

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"; //react query

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const queryClient = new QueryClient(); //queryClient

const theme = extendTheme({ colors });

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <App />
            <ToastContainer />
          </GlobalProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
