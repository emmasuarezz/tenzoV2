import "../styles/CSS/footer.css";
import logo from "../assets/logoBW.svg";
import Behance from "../assets/behance.png";
import GitHub from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="deco-wrapper">
        <div className="left-ornament-top"></div>
        <div className="left-ornament-bottom"></div>
      </div>
      <div className="logo">
        <Link to={"/home"}>
          <img src={logo} alt="" />
        </Link>
        <p>
          <span>tenzo</span>.tech
        </p>
        <div className="flex">
          <div className="socials-balls">
            <a href="https://github.com/emmasuarezz" target="_blank">
              <img src={GitHub} alt="" />
            </a>
          </div>
          <div className="socials-balls">
            <a
              href="https://www.linkedin.com/in/emmanuelsuarezt/"
              target="_blank"
            >
              <img src={LinkedIn} alt="" />
            </a>
          </div>
          <div className="socials-balls">
            <img src={Behance} alt="" />
          </div>
        </div>
        <p>made with a lot of love, and mate {`<3`}</p>
      </div>
      <div className="deco-wrapper">
        <div className="left-ornament-top"></div>
        <div className="left-ornament-bottom"></div>
      </div>
    </footer>
  );
};

export default Footer;
