import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// add portal div also to the body
const rootElement = document.getElementById("root");

// TypeScript check to ensure root element exists
if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure there is a div with id "root" in your HTML'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Create portal root for modals and popups
const portalRoot = document.createElement("div");
portalRoot.id = "portal";
document.body.appendChild(portalRoot);
