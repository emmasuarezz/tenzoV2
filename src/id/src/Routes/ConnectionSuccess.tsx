import { useEffect } from "react";

function ConnectionSuccess() {
  const getToken = () => {
    let accessToken = "";
    const fragmentParams = new URLSearchParams(
      window.location.hash.substring(1)
    );
    accessToken = fragmentParams.get("access_token")!;

    localStorage.setItem("token", accessToken);
    return accessToken;
  };
  const getUser = async (token: string) => {
    try {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();

      let currentUser = {
        display_name: data.display_name,
        img: data.images[1].url,
      };
      localStorage.setItem("user", JSON.stringify(currentUser));
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (error) {
      alert(error); // TODO: make this a modal or something idk
      window.location.href = "id/profile-setup";
    }
  };

  useEffect(() => {
    getUser(getToken());
    alert("Successfully connected to Spotify!");
    alert(localStorage.getItem("token"));
  }, []);

  return (
    <div className="profile-setup-container flex-col">
      <h1 className="connection-success">Successfully connected</h1>
      <h2 className="connection-success-sub">
        Feel free to close this tab and finish your profile! It will
        automatically close in 2 seconds.
      </h2>
    </div>
  );
}

export default ConnectionSuccess;
