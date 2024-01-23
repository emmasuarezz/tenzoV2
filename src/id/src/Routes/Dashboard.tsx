import { db, auth } from "../firebase";
import { get, ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "../styles/CSS/dashboard.css";

function Dashboard() {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getActiveUsers() {
    const snapshot = await get(ref(db, "users"));
    const users = snapshot.val();
    const activeUsers = Object.keys(users).map((key) => users[key]);
    return activeUsers;
  }
  useEffect(() => {
    setIsLoading(true);
    getActiveUsers().then((users) => {
      setActiveUsers(users);
      setIsLoading(false);
    });
  }, []);

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

  const usersCards = activeUsers.map((user) => (
    <div className="user-card">
      <img src={user.img} alt="" />
      <div className="text-container">
        <div>
          <h2 style={{ color: "white" }}>{user.name}</h2>
          <p>Say hi!</p>
        </div>
        <span>
          {user.pronouns} {user.pronouns === "they/them" ? "are" : "is"}{" "}
          {user.status ? "online" : "offline"}
        </span>
      </div>
    </div>
  ));

  return (
    <div className="dash-wrapper">
      <button className="signOut-button" onClick={handleSignOut}>
        sign out
      </button>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div className="spinner-wrapper">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="users-container">{usersCards}</div>
      )}
    </div>
  );
}

export default Dashboard;
