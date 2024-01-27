import { TopBar } from "../Components";
import "../styles/CSS/utils.css";
import "../styles/CSS/Calculate.css";
import { useState, useEffect } from "react";
import { CountrySelect, Cities } from "../Components";
const apiKey = "6593abead9dd40fe9a942bad2d4463b4";

const url = "https://astrologer.p.rapidapi.com/api/v3/birth-chart";

type person = {
  name: string;
  lastName: string;
  birthDate: string;
  birthTime: string;
  country: string;
  city: string;
  pronouns: string;
};
type location = {
  city: string;
  country: string;
};

const tnzPerson: person = {
  name: "Tenzo",
  lastName: "Star",
  birthDate: "2003-10-30",
  birthTime: "01:08",
  country: "Uruguay",
  city: "Montevideo",
  pronouns: "he/his",
};

function Calculate() {
  const [loading, setLoading] = useState(false);
  const [calulating, setCalculating] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("Uruguay");
  const [currentCity, setCurrentCity] = useState("Montevideo");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [person, setPerson] = useState<person>(tnzPerson);

  const getAstroData = async () => {
    setCalculating(true);
    const astroUrl = url;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "96ba1dae26msha984c51b32798c6p19c4b3jsne35e232be73d",
        "X-RapidAPI-Host": "astrologer.p.rapidapi.com",
      },
      body: JSON.stringify({
        name: person.name,
        year: person.birthDate.slice(0, 4),
        month: person.birthDate.slice(5, 7),
        day: person.birthDate.slice(8, 10),
        hour: person.birthTime.slice(0, 2),
        minute: person.birthTime.slice(3, 5),
        longitude: longitude,
        latitude: latitude,
        city: currentCity,
        timezone: "America/Buenos_Aires",
        language: "ENG",
      }),
    };

    try {
      const response = await fetch(astroUrl, options);
      const result = await response.json();
      const planets = result.data;
      localStorage.setItem("astroData", JSON.stringify(planets));
    } catch (error) {
      console.error(error);
    } finally {
      setCalculating(false);
      window.location.href = "/star/result";
    }
  };

  useEffect(() => {
    const cityInput = document.getElementById("city");

    if (cityError) {
      cityInput?.classList.add("error-select");
    } else {
      cityInput?.classList.remove("error-select");
    }
  }, [cityError]);
  useEffect(() => {
    const cityInput = document.getElementById("city");
    if (loading) {
      cityInput?.classList.add("loading-input");
    } else {
      cityInput?.classList.remove("loading-input");
    }
  }, [loading]);
  useEffect(() => {
    const fetchCoordinates = async ({ city, country }: location) => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${apiKey}`
        );
        const data = await response.json();
        const location = data.results[0].geometry;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCoordinates({ city: currentCity, country: currentCountry });
  }, [currentCity]);

  return (
    <div className="containerVh-scroll">
      <TopBar />
      <h1 className="form-title">
        Glad you decided to check it out!
        <br /> Just fill up the form and you will have your results in no time.
      </h1>
      <div className="star-form-container">
        <div className="form-border">
          <form className="form-group">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    name: e.target.value,
                  }));
                }}
                type="text"
                name="name"
                id="name"
                className="input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last name</label>
              <input
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    lastName: e.target.value,
                  }));
                }}
                type="text"
                name="lastName"
                id="lastName"
                className="input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthDate">Date of birth</label>
              <input
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    birthDate: e.target.value,
                  }));
                }}
                type="date"
                name="birthDate"
                id="birthDate"
                className="input input-date"
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthTime">Time of birth</label>
              <div className="input-group">
                <input
                  onChange={(e) => {
                    setPerson((prevPerson) => ({
                      ...prevPerson,
                      birthTime: e.target.value,
                    }));
                  }}
                  type="time"
                  name="birthTime"
                  id="birthTime"
                  className="input input-date"
                />
                <p className="loading-message">Use the 24hs format</p>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                className="input input-select"
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    country: e.target.value,
                  }));
                  setCurrentCountry(e.target.value);
                }}
                value={currentCountry}
              >
                <CountrySelect />
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                className="input input-select"
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    city: e.target.value,
                  }));
                  setCurrentCity(e.target.value);
                }}
                value={currentCity}
              >
                <Cities
                  cityError={setCityError}
                  country={currentCountry}
                  setLoading={setLoading}
                />
              </select>
              {cityError && (
                <p className="error-message">
                  Seems like we don't have data for that country {":("}
                </p>
              )}
              {loading && (
                <p className="loading-message">
                  looking for some cities {":)"}
                </p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="pronouns">What are your pronouns?</label>
              <select
                name="pronouns"
                id="pronouns"
                className="input input-select"
                onChange={(e) => {
                  setPerson((prevPerson) => ({
                    ...prevPerson,
                    pronouns: e.target.value,
                  }));
                }}
                value={person.pronouns}
              >
                <option value="they">They/Them</option>
                <option value="she">She/Her</option>
                <option value="he">He/His</option>
              </select>
            </div>
            <button
              className="send-button"
              onClick={(e) => {
                e.preventDefault();
                getAstroData();
              }}
            >
              continue
            </button>
          </form>
          {calulating && <p className="loading-message mt-1">Working on it!</p>}
        </div>
      </div>
    </div>
  );
}

export default Calculate;
