import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.tsx";
import "./index.css";
import "./loader.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <App />
        <ToastContainer />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
);
