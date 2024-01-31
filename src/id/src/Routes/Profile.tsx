import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../styles/CSS/profile.css";

function Profile() {
  const [user, setUser] = useState({ display_name: "", img: "" });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = "/id";
      }
    });
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Good afternoon {user!.display_name}!</h1>

      <div className="profile-image-wrapper">
        <img src={user!.img} alt="profile" />
        <button>edit</button>
      </div>
    </div>
  );
}

export default Profile;
