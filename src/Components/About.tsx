import "../styles/CSS/About.css";
import "../styles/CSS/utils.css";
import aboutPhoto from "../assets/about-photo.png";

function About() {
  return (
    <>
      <div className="w-70 h-full about-text">
        <p>
          My name is Emmanuel Suárez. I am currently pursuing an{" "}
          <span className="accent-green">Electrical Engineering</span> degree at
          UdelaR. Since my early school days, I've been driven by an insatiable{" "}
          <span className="accent-green">curiosity</span>, always eager to{" "}
          <span className="accent-green">explore and learn</span> about a wide
          range of subjects that goes from math, programming, all the way to{" "}
          <span className="accent-green">designing</span>, sketching and
          thinking about <span className="accent-green">solutions</span>.
        </p>
      </div>
      <div className="w-30 photo-container">
        <img className="about-photo" src={aboutPhoto} alt="" />
      </div>
    </>
  );
}
export default About;
