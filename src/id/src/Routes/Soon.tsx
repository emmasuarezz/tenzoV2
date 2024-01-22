import "../styles/CSS/soon.css";
import { db, auth } from "../firebase";
import { ref, set } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Soon() {
  const handleSignOut = async () => {
    const currentUser = auth.currentUser;
    try {
      set(ref(db, "users/" + currentUser!.uid + "/status"), false);
      await signOut(auth).then(() => {
        window.location.href = "/id";
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set status to true
        set(ref(db, "users/" + user.uid + "/status"), true);
      } else {
        // User is signed out, do nothing
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

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

      <h3 onClick={() => (window.location.href = "/id/dash")}>Dashboard</h3>
      <h2
        className="profile-button"
        onClick={() => (window.location.href = "/id/profile-setup")}
      >
        Go to my profile
      </h2>

      <button className="signOut-button" onClick={handleSignOut}>
        sign out
      </button>
    </div>
  );
}

export default Soon;
