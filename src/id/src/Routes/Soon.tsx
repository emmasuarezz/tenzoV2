import "../styles/CSS/soon.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Soon() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have been signed out");
      window.location.href = "/id";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="soon-container">
      <h1>
        Thanks for checking <span>tnz.ID</span> out!
      </h1>
      <h2>
        I apprecate the time you took to create an account, you absolutely rock!
      </h2>
      <h2>Stay tune, there's more to come...</h2>
      <h3>last updated: 01/19/2024 // tenzo</h3>

      <button className="signOut-button" onClick={handleSignOut}>
        sign out
      </button>
    </div>
  );
}

export default Soon;
