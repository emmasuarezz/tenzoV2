import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Soon } from "./Routes";

const router = createBrowserRouter([
  { path: "/", element: <Auth /> },
  { path: "/coming-soon", element: <Soon /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
