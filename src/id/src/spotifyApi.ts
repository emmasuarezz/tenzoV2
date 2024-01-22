const clientId = "85c5c6ee6c37437c82fa6a3f98d47c5c";
const redirectUri = "https://tenzo.tech/id/success-connection";
const scope = "user-read-private user-read-email user-top-read";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const requestAuth = (e: any) => {
  e.preventDefault();
  const state = generateRandomString(16);

  localStorage.setItem("stateKey", state);

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(clientId);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirectUri);
  url += "&state=" + encodeURIComponent(state);

  window.open(url, "_blank");
};
