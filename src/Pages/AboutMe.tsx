import { Navbar, Footer } from "../Components";
import design from "../assets/aboutAvatarDesign.svg";
import avatar from "../assets/about-photo.png";
import separator from "../assets/gradient separator.svg";
import "../styles/SASS/AboutMe.scss";
import "../styles/SASS/utils.scss";
import cards from "../assets/JSON/AboutMe.json";

type AboutCard = {
  title: string;
  accent?: string;
  body: string;
};

const aboutCards = (array: AboutCard[]) => {
  return array.map((card) => {
    return (
      <div className="about-card">
        <h3>
          {card.title} {card.accent ? <span>{card.accent}</span> : ""}
        </h3>
        <p>{card.body}</p>
      </div>
    );
  });
};

function AboutMe() {
  return (
    <>
      <Navbar color="gradient-orange" />
      <div className="avatar-container">
        <img className="avatar" src={avatar} alt="" />
        <img className="avatar-design" src={design} alt="" />
      </div>
      <div className="flex-center">
        <img src={separator} alt="" />
      </div>
      <section className="bio">
        <h1>Hello there!</h1>
        <p>
          My name is Emmanuel Suárez, I am currently pursuing an Electrical
          Engineering degree at UdelaR. Since my early school days, I've been
          driven by an insatiable curiosity, always eager to explore and learn
          about a wide range of subjects that goes from math, and programming,
          all the way to designing, sketching, thinking about solutions.This
          journey has led me to a multitude of interests and skills, and it's
          the process of learning and working towards something that brings me
          the greatest fulfillment. I've built this website from scratch,
          developed a portfolio of projects, and dedicated countless hours to
          self-improvement through independent learning and formal courses.
        </p>
      </section>
      <section className="flex-center column about-card-container">
        <h2>Hi Emma! Nice to meet you, cool website...</h2>
        <h2>But what else can you do?</h2>
        <h2>Ha, glad you asked!</h2>
        {aboutCards(cards)}
      </section>
      <Footer />
    </>
  );
}

export default AboutMe;
