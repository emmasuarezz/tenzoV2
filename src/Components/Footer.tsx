import "../styles/CSS/footer.css";
import logo from "../assets/logoBW.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="deco-wrapper">
        <div className="left-ornament-top"></div>
        <div className="left-ornament-bottom"></div>
      </div>
      <div className="logo">
        <img src={logo} alt="" />
        <p>
          <span>tenzo</span>.tech
        </p>
        <div className="flex">
          <div className="socials-balls"></div>
          <div className="socials-balls"></div>
          <div className="socials-balls"></div>
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
