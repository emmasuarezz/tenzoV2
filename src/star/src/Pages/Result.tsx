import { useEffect, useState } from "react";
import { PlanetsDisplay, TopBar } from "../Components";
import "../styles/CSS/result.css";

function mapPlanets(astroData: any) {
  let newPlanets: any = {};

  Object.keys(astroData).forEach((key) => {
    let item = astroData[key];
    if (
      typeof item === "object" &&
      item !== null &&
      item.point_type === "Planet"
    ) {
      newPlanets[item.name] = item;
    }
  });
  return newPlanets;
}

function Result() {
  const [planets, setPlanets] = useState({});
  let astroDataString = localStorage.getItem("astroData");
  let astroData = astroDataString ? JSON.parse(astroDataString) : null;
  const birthdate = `${astroData.year}/${astroData.month}/${astroData.day}`;

  useEffect(() => {
    const planetsObject = mapPlanets(astroData);
    console.log(planetsObject);
    delete planetsObject.Mean_Node;
    delete planetsObject.True_Node;
    console.log(planetsObject);
    const ephemeris = {
      ...planetsObject,
      rising: astroData.first_house,
      midheaven: astroData.tenth_house,
    };
    ephemeris.rising.name = "Rising";
    ephemeris.midheaven.name = "Midheaven";
    setPlanets(ephemeris);
  }, []);

  return (
    <div className="result-container">
      <TopBar />
      <h1 className="result-title">
        Here is the birth chart of <span>{astroData.name}</span> born on{" "}
        {birthdate} at {astroData.city}.
      </h1>

      <section className="planets-container">
        <h2 className="result-subtitle">planets</h2>
        <section className="planets-grid">
          {Object.values(planets).map((planet: any) => (
            <PlanetsDisplay planet={planet} />
          ))}
        </section>
      </section>
    </div>
  );
}

export default Result;
