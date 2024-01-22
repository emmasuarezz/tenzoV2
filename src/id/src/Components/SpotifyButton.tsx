import spotifyLogo from "../assets/spotifyLogo.webp";
import { requestAuth } from "../spotifyApi.ts";

function SpotifyButton({
  text,
  extraClass,
}: {
  text: string;
  extraClass?: string;
  context?: any;
}) {
  function handleClick(e: any) {
    e.preventDefault();
    // setLoading(true);
    try {
      requestAuth(e);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className={`sign-in-button ${extraClass}`}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <img src={spotifyLogo} alt="" />
      <span>{text}</span>
    </button>
  );
}

export default SpotifyButton;
