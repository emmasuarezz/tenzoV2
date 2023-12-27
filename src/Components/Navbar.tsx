import logo from "../assets/logo.svg";
import "../styles/CSS/Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type NavbarType = {
  color: string;
};

function Navbar({ color }: NavbarType) {
  const [active, setActive] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const url = window.location.href;

    if (url.includes("projects")) {
      setActive("projects");
    }
    if (url.includes("about")) {
      setActive("about");
    }
    if (url.includes("contact")) {
      setActive("contact");
    }
  }, []);

  const navPrimaryClass = `header-primary ${color}`;
  const navSecondaryClass = `header-secondary ${color}`;

  const navPrimary = (
    <header className={navPrimaryClass}>
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
    <header className={navSecondaryClass}>
      <Link to="/home" className="logo">
        <img src={logo} alt="" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link
              id="projects"
              className={active == "projects" ? "active" : "not-active"}
              to="/projects"
            >
              projects
            </Link>
          </li>
          <li>
            <a
              id="about"
              href="#"
              className={active == "about" ? "active" : "not-active"}
            >
              about me
            </a>
          </li>
          <li>
            <Link
              id="contact"
              className={active == "contact" ? "active" : "not-active"}
              to="/contact"
            >
              contact
            </Link>
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
