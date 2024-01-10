import aquarius from "../assets/static/signs/acuario.svg";
import aries from "../assets/static/signs/aries.svg";
import cancer from "../assets/static/signs/cancer.svg";
import capricorn from "../assets/static/signs/capricornio.svg";
import taurus from "../assets/static/signs/tauro.svg";
import gemini from "../assets/static/signs/geminis.svg";
import leo from "../assets/static/signs/leo.svg";
import virgo from "../assets/static/signs/virgo.svg";
import libra from "../assets/static/signs/libra.svg";
import scorpio from "../assets/static/signs/escorpio.svg";
import sagittarius from "../assets/static/signs/sagitario.svg";
import pisces from "../assets/static/signs/piscis.svg";

import sun from "../assets/static/planets/sol.svg";
import moon from "../assets/static/planets/luna.svg";
import mercury from "../assets/static/planets/mercurio.svg";
import venus from "../assets/static/planets/venus.svg";
import mars from "../assets/static/planets/marte.svg";
import jupiter from "../assets/static/planets/jupiter.svg";
import saturn from "../assets/static/planets/saturno.svg";
import uranus from "../assets/static/planets/urano.svg";
import neptune from "../assets/static/planets/neptuno.svg";
import pluto from "../assets/static/planets/pluton.svg";
import rising from "../assets/static/planets/rising.svg";
import midheaven from "../assets/static/planets/midheaven.svg";

interface PlanetCardProps {
  planet: {
    name: string;
    sign: string;
    // Include other properties here if needed
  };
}
interface SignImages {
  [key: string]: string;
  Ari: string;
  Tau: string;
  Gem: string;
  Can: string;
  Leo: string;
  Vir: string;
  Lib: string;
  Sco: string;
  Sag: string;
  Cap: string;
  Aqu: string;
  Pis: string;
}

interface PlanetImages {
  [key: string]: string;
  Sun: string;
  Moon: string;
  Mercury: string;
  Venus: string;
  Mars: string;
  Jupiter: string;
  Saturn: string;
  Uranus: string;
  Neptune: string;
  Pluto: string;
  Rising: string;
  Midheaven: string;
}

const signImages: SignImages = {
  Ari: aries,
  Tau: taurus,
  Gem: gemini,
  Can: cancer,
  Leo: leo,
  Vir: virgo,
  Lib: libra,
  Sco: scorpio,
  Sag: sagittarius,
  Cap: capricorn,
  Aqu: aquarius,
  Pis: pisces,
  // Add the rest of the signs...
};
const planetImages: PlanetImages = {
  Sun: sun,
  Moon: moon,
  Mercury: mercury,
  Venus: venus,
  Mars: mars,
  Jupiter: jupiter,
  Saturn: saturn,
  Uranus: uranus,
  Neptune: neptune,
  Pluto: pluto,
  Rising: rising,
  Midheaven: midheaven,
};

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <div className="planet">
      <img src={planetImages[planet.name]} alt={planet.name} />
      <p className="planet-card-text">{planet.name.toLowerCase()} in</p>
      <img src={signImages[planet.sign]} alt={planet.sign} />
    </div>
  );
};

export default PlanetCard;
