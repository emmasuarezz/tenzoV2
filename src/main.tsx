import React from "react";
import ReactDOM from "react-dom/client";
import {
  Contact,
  Landing,
  ProjectDetail,
  Projects,
  Welcome,
  AboutMe,
} from "./Pages";
import "./styles/CSS/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/userContext";
import TenzoStarLanding from "../src/star/src/Pages/Landing";
import TenzoStarCalculate from "../src/star/src/Pages/Calculate";
import TenzoStarResult from "../src/star/src/Pages/Result";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/star" element={<TenzoStarLanding />} />
          <Route path="/star/calculate" element={<TenzoStarCalculate />} />
          <Route path="/star/result" element={<TenzoStarResult />} />
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
