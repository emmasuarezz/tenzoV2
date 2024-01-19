import spotifyLogo from "../assets/spotifyLogo.webp";

function SpotifyButton() {
  return (
    <button className="sign-in-button">
      <img src={spotifyLogo} alt="" />
      <span>Sign in with Spotify</span>
    </button>
  );
}

export default SpotifyButton;
