import "../styles/CSS/profileSetup.css";
import { useState, useEffect } from "react";
import { PicturePicker, SpotifyButton } from "../Components";

function ProfileSetup() {
  const [spotifyConnected, setSpotifyConnected] = useState<boolean>(false);
  const [nameSize, setNameSize] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [fontSize, setFontSize] = useState("3rem");
  const [picture, setPicture] = useState<string | null>(null);
  const [changePicture, setChangePicture] = useState<boolean>(false);
  const [spotifyImg, setSpotifyImg] = useState<string>("");

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
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(user);
      setPicture(user.img);
      setSpotifyImg(user.img);
      setName(user.display_name);
      setNameSize(user.display_name ? user.display_name.length : 0);
      if (user.display_name !== "" && user.display_name !== undefined) {
        setSpotifyConnected(true);
      }
    };

    // Call the function once to set the initial state
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array so the hook runs only once

  useEffect(() => {
    const set01 = document.getElementById("name-complete");
    const set02 = document.getElementById("photo-complete");
    const set03 = document.getElementById("connection-complete");
    let completeText = document.getElementById("complete-text");

    if (nameSize > 0 && age.length > 0) {
      set01?.classList.add("profile-complete");
    } else {
      set01?.classList.remove("profile-complete");
    }
    if (picture) {
      set02?.classList.add("profile-complete");
    } else {
      set02?.classList.remove("profile-complete");
    }
    if (spotifyConnected) {
      set03?.classList.add("profile-complete");
    } else {
      set03?.classList.remove("profile-complete");
    }

    if (nameSize > 0 && age.length > 0 && picture && spotifyConnected) {
      document
        .querySelector(".complete-button")
        ?.classList.add("complete-button-active");

      completeText!.innerHTML = "All set! Good job.";
    } else {
      document
        .querySelector(".complete-button")
        ?.classList.remove("complete-button-active");
      completeText!.innerHTML = "This is what you need to do.";
    }
  }, [name, picture, user, age]);

  const connectSpotify = () => {
    return (
      <SpotifyButton
        text={"Connect your account"}
        extraClass={disabled ? "button-disabled" : "button-actionable"}
      />
    );
  };

  const connected_content = () => {
    return (
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
          addImg={spotifyImg}
        />

        <div className="flex-col">
          <section className="flex flex-wrap j-center">
            <h2>Hello, </h2>
            <div className="name-input-wrapper">
              <input
                style={{ fontSize }}
                value={name}
                placeholder="what's your name?"
                type="text"
                className="profile-name-input"
                size={nameSize}
                onChange={(e) => {
                  setNameSize(e.target.value.length);
                  setName(e.target.value);
                  if (e.target.value.length > 9) {
                    setFontSize("2.2em"); // or any smaller size you want
                  } else {
                    setFontSize("3em"); // reset to the initial size
                  }
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

          <section className="secondary-input-wrapper mb-1">
            <h2 className="secondary-title">and your age please</h2>

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              name="age"
              id="age"
            ></input>
          </section>
        </div>
      </div>
    );
  };

  return (
    <div className="profile-setup-container">
      <section className="setup-container">
        <h1 className="container-title">Let's set you up in no time!</h1>
        <hr />
        {spotifyConnected ? (
          connected_content()
        ) : (
          <div className="connectSpotify">
            <h2 className="connectSpotify-title">
              First, let's connect your spotify account
            </h2>
            {connectSpotify()}
          </div>
        )}
        <hr />
        <section className="secondary-input-wrapper complete-wrapper">
          <div style={{ width: "100%", maxWidth: "250px" }}>
            <h2 id="complete-text" className="secondary-title">
              All set?
            </h2>
            <ul>
              <li id="name-complete">Set your name, pronouns and age</li>
              <li id="photo-complete">Change your profile photo</li>
              <li id="connection-complete">Connect your Spotify account</li>
            </ul>
          </div>
          <div className="complete-button-container">
            <button className="complete-button">All set!</button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProfileSetup;
