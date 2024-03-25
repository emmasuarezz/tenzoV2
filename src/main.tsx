import React from "react";
import ReactDOM from "react-dom/client";
import { Contact, Landing, ProjectDetail, Projects, AboutMe } from "./Pages";
import "./styles/CSS/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/userContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
