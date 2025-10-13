import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
          <ToastContainer />
        </BrowserRouter>
        {/* <RouterProvider router={AppRouter} /> */}
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
