import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "../styles/CSS/Welcome.css";

function Welcome() {
  const { setUser } = useContext(UserContext);

  const handleNameChange = (event: any) => {
    if (event.target.value === "") {
      setUser("Stranger");
      return;
    }
    setUser(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Hello there!</h1>
      <h2>You will see everything in just a second.</h2>
      <h3>But first, tell me your name please.</h3>
      <div className="input-group">
        <input
          onChange={handleNameChange}
          type="text"
          placeholder="Your name"
        />
        <Link className="button" to="/home">
          Go
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
