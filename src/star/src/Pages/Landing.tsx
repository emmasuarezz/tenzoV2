import { TopBar, Card } from "../Components";
import { Link } from "react-router-dom";

import "../styles/CSS/Landing.css";
import "../styles/CSS/utils.css";

function Landing() {
  return (
    <div className="containerVh">
      <TopBar />
      <div className="flex-100 j-center">
        <h1 className="text-hero flex-col">
          Ready to discover
          <span>
            your <span>big three?</span>
          </span>
        </h1>
      </div>
      <div className="flex-card-container j-center">
        <Card color="yellow" image="sun" body="sun" />
        <Card color="black" image="moon" body="moon" />
        <Card color="mush" image="rising" body="rising" />
      </div>
      <div className="flex-100 j-center">
        <Link to={"/star/calculate"}>
          <div className="cta-button">
            <h2>Get started</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
