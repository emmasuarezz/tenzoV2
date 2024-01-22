import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Auth,
  ConnectionSuccess,
  Dashboard,
  ProfileSetup,
  Soon,
} from "./Routes";
import { UserContextProvider } from "./Context/spotifyContext";

const router = createBrowserRouter([
  { path: "/", element: <Auth /> },
  { path: "/coming-soon", element: <Soon /> },
  { path: "/profile-setup", element: <ProfileSetup /> },
  { path: "/success-connection", element: <ConnectionSuccess /> },
  { path: "/dash", element: <Dashboard /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
