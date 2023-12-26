import logo from "../assets/logo.svg";
import "../styles/CSS/Navbar.css";

import { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("projects");
  const [showList, setShowList] = useState(false);

  const navPrimary = (
    <header className="header-primary">
      <div className="deco-wrapper">
        <div className="left-ornament-top"></div>
        <div className="left-ornament-bottom"></div>
      </div>
      <div onClick={() => setShowList(!showList)} className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="deco-wrapper">
        <div className="right-ornament-top"></div>
        <div className="right-ornament-bottom"></div>
      </div>
    </header>
  );

  const navSecondary = (
    <header className="header-secondary">
      <div onClick={() => setShowList(!showList)} className="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul>
          <li>
            <a
              id="projects"
              href="#"
              className={active == "projects" ? "active" : "not-active"}
              onClick={() => setActive("projects")}
            >
              projects
            </a>
          </li>
          <li>
            <a
              id="about"
              href="#"
              className={active == "about" ? "active" : "not-active"}
              onClick={() => setActive("about")}
            >
              about me
            </a>
          </li>
          <li>
            <a
              id="contact"
              href="#"
              className={active == "contact" ? "active" : "not-active"}
              onClick={() => setActive("contact")}
            >
              contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );

  let nav: JSX.Element;

  showList ? (nav = navSecondary) : (nav = navPrimary);

  return nav;
}
export default Navbar;
