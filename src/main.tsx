import React from "react";
import ReactDOM from "react-dom/client";
import { Contact, Landing, ProjectDetail, Projects, AboutMe } from "./Pages";
import "./styles/CSS/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/userContext";
import TenzoStarLanding from "../src/star/src/Pages/Landing";
import TenzoStarCalculate from "../src/star/src/Pages/Calculate";
import TenzoStarResult from "../src/star/src/Pages/Result";
import {
  Auth as IdAuth,
  Soon as IdSoon,
  ProfileSetup as IdProfileSetup,
  ConnectionSuccess as IdConnectionSpotify,
  Dashboard as IdDashboard,
} from "../src/id/src/Routes/";

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
          <Route path="/star" element={<TenzoStarLanding />} />
          <Route path="/star/calculate" element={<TenzoStarCalculate />} />
          <Route path="/star/result" element={<TenzoStarResult />} />
          <Route path="/id" element={<IdAuth />} />
          <Route path="/id/coming-soon" element={<IdSoon />} />
          <Route path="/id/profile-setup" element={<IdProfileSetup />} />
          <Route
            path="/id/success-connection"
            element={<IdConnectionSpotify />}
          />
          <Route path="/id/dash" element={<IdDashboard />}></Route>
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
