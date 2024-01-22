import "../styles/CSS/profileSetup.css";
import { useState, useEffect, useContext } from "react";
import { PicturePicker, SpotifyButton } from "../Components";
import { ApiContext } from "../Context/spotifyContext";

function ProfileSetup() {
  const { loading } = useContext(ApiContext);

  const [nameSize, setNameSize] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const [picture, setPicture] = useState<string | null>(null);
  const [changePicture, setChangePicture] = useState<boolean>(false);

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (nameSize > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameSize]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        setUser(JSON.parse(e.newValue || "{}"));
        console.log("i am running", e.newValue);
      }
      setPicture(user.img);
      setName(user.display_name);
      setNameSize(user.display_name.length);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

  const connectSpotify = () => {
    return (
      <SpotifyButton
        text={"Connect your account"}
        extraClass={disabled ? "button-disabled" : "button-actionable"}
      />
    );
  };

  return (
    <div className="profile-setup-container">
      <section className="setup-container">
        <h1 className="container-title">Let's set you up in no time!</h1>
        <hr />
        <div className="flex personal-section">
          <section className="photo-wrapper">
            <div
              className="id-photo-container"
              onClick={() => setChangePicture(!changePicture)}
            >
              <img
                src={picture ? picture : "https://via.placeholder.com/150"}
                alt="profile"
                className="profile-photo"
              />
            </div>
          </section>
          <PicturePicker
            setPicture={setPicture}
            setChangePicture={setChangePicture}
            isVisible={changePicture}
          />

          <div className="flex-col">
            <section className="flex flex-wrap j-center">
              <h2>Hello, </h2>
              <div className="name-input-wrapper">
                <input
                  value={name}
                  placeholder="what's your name?"
                  type="text"
                  className="profile-name-input"
                  size={nameSize}
                  onChange={(e) => {
                    setNameSize(e.target.value.length);
                    setName(e.target.value);
                  }}
                />
              </div>
            </section>
            {nameSize > 0 && <p className="input-subtext">Ooh, cool name.</p>}

            <section className="secondary-input-wrapper">
              <h2 className="secondary-title">tell me your pronouns</h2>

              <select name="" id="">
                <option value="he">he / him</option>
                <option value="she">she / her</option>
                <option value="they">they / them</option>
              </select>
            </section>

            <section className="secondary-input-wrapper">
              <h2 className="secondary-title">and what about your age?</h2>

              <input name="age" id="age"></input>
            </section>
            <section className="secondary-input-wrapper">
              <h2 className="secondary-title">
                take a moment to read the terms and conditions please
              </h2>

              <input type="checkbox" id="terms" name="terms"></input>
              <label className="secondary-title" htmlFor="terms">
                I accept the terms and conditions
              </label>
            </section>
          </div>
        </div>

        <section className="spotify-connect-wrapper">
          {connectSpotify()}
          {loading && <div className="load-spinner"></div>}
        </section>
        <hr />
      </section>
    </div>
  );
}

export default ProfileSetup;
