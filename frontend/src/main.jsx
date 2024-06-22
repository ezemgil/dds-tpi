import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Estilos e íconos
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/App.css";
import "./assets/css/flags.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
