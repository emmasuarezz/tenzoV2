import React from "react";
import ReactDOM from "react-dom/client";
import { Landing, Welcome } from "./Pages";
import "./styles/CSS/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./Context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  { path: "/home", element: <Landing /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);