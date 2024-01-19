import "../styles/CSS/googleButton.css";
import googleLogo from "../assets/googleLogo.png";

function GoogleButton() {
  return (
    <button className="sign-in-button">
      <img src={googleLogo} alt="" />
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleButton;
