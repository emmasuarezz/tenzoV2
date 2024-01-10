import "../styles/CSS/Card.css";
import "../styles/CSS/utils.css";
import { CardProps } from "../Types/Prop Types/Card";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import rising from "../assets/rising.svg";
import cardData from "../assets/JSONS/CardBody.json";
import { useState } from "react";

const imageMap = {
  sun: sun,
  moon: moon,
  rising: rising,
};
const bodyMap = {
  sun: cardData.sun,
  moon: cardData.moon,
  rising: cardData.rising,
};

function Card({ color, image, body }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped(!flipped);

  const borderClass = `card-inner border border-${color} flex-100 j-center`;
  const cardClass = `${color}`;

  const imageData = imageMap[image as "sun" | "moon" | "rising"];
  const bodyData = bodyMap[body as "sun" | "moon" | "rising"];

  const front = (
    <div className={borderClass}>
      <img src={imageData} alt="" />
    </div>
  );
  const back = (
    <div className={borderClass}>
      <p className={cardClass}>{bodyData}</p>
    </div>
  );

  return (
    <div>
      <div className="card" onClick={flip}>
        {flipped ? back : front}
      </div>
      <div className={color == "black" ? "white" : color}>
        <h1>{body}</h1>
      </div>
    </div>
  );
}

export default Card;
