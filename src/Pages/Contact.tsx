import { Navbar, Footer } from "../Components";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import cv from "../assets/static/CV_EmmanuelSuarez.pdf";
import "../styles/CSS/Contact.css";
function Contact() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar color="gradient-green" />
      <main className="contact-container">
        <h1>Thanks for considering me</h1>
        <h2>
          Here you have all the ways to get in touch with me, my socials,
          <br /> my email and also my resume. Hope to hear from you soon{" "}
          <span>{user}</span>!
        </h2>

        <section className="socials-wrapper">
          <div className="social">
            <h3>LinkedIn</h3>
          </div>
          <div className="social">
            <h3>Github</h3>
          </div>
          <div className="social">
            <h3>Behance</h3>
          </div>
          <div className="social">
            <h3>Email</h3>
          </div>
        </section>
        <h3 className="cv">
          <a href={cv} download="CV_EmmanuelSuarez_TenzoTech.pdf">
            download my CV <span>{"<3"}</span>
          </a>
        </h3>
      </main>
      <Footer />
    </>
  );
}

export default Contact;