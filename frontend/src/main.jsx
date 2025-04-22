import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="496920698153-m94f47p9n4svstdueficnb9e028rusro.apps.googleusercontent.com">
    <App />
    <ToastContainer />
    </GoogleOAuthProvider>
  </StrictMode>
);
