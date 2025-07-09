import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Enquiry from "./components/Enquiry.jsx";
import "sweetalert2/src/sweetalert2.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Enquiry />
  </StrictMode>
);
