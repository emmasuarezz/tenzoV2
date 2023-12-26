import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import "../styles/CSS/Landing.css";
import "../styles/CSS/utils.css";
import { About, Footer, Navbar, BlogCard } from "../Components";
// @ts-ignore
import Design from "../assets/design.svg";
import Behance from "../assets/behance.png";
import GitHub from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";
import Separator from "../assets/gradient separator.svg";
import blogEntries from "../assets/JSON/blog.json";

function Landing() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar color="gradient-orange" />
      <main>
        <div>
          <section className="hero">
            <h1>
              Welcome
              <br />
              <span>{user}</span>!
            </h1>
            <p className="subtitle">
              Hey! Thanks for stopping by.
              <br />
              Here you can see all my projects, get to know me a little bit and
              get in contact. Hope you like it all.
            </p>
            <div className="flex-100-between mt-17 p-12">
              <Link to="/projects" className="hero-button">
                projects
              </Link>
              <Link to="/contact" className="hero-button">
                contact
              </Link>
            </div>
          </section>

          <section className="hero">
            <img className="design" src={Design} alt="" />
            <div className="flex-100-socials mt-42">
              <div className="ball-wrapper">
                <a href="https://github.com/emmasuarezz" target="_blank">
                  <img className="ball-image" src={GitHub} alt="" />
                </a>
              </div>
              <div className="ball-wrapper">
                <a
                  href="https://www.linkedin.com/in/emmanuelsuarezt/"
                  target="_blank"
                >
                  <img className="ball-image" src={LinkedIn} alt="" />
                </a>
              </div>
              <div className="ball-wrapper">
                <img className="ball-image" src={Behance} alt="" />
              </div>
            </div>
          </section>
        </div>
        <img className="gradient-separator" src={Separator} alt="" />
        <div className="pattern-separator"></div>
        <section className="about-wrapper">
          <About />
        </section>
        <section className="blog-section">
          <h2 className="blog-title">What I've been up to lately...</h2>
          {blogEntries.map((entry) => {
            return (
              <BlogCard
                title={entry.title}
                body={entry.body}
                img={entry.img}
                date={entry.date}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Landing;
