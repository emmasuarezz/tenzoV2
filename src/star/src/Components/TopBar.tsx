import "../styles/CSS/TopBar.css";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="topBar">
      <div className="flex-100 h-85">
        <div className="flexCol">
          <div className="row-left"></div>
          <div className="row-left"></div>
        </div>
        <Link to={"/star"}>
          <h1 className="title center">tenzo.star</h1>
        </Link>
        <div className="flexCol">
          <div className="row-right"></div>
          <div className="row-right"></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
