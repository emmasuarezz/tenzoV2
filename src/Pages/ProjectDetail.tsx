import { useParams } from "react-router-dom";
import { Navbar, Footer } from "../Components";
import { useState } from "react";
import tenzoId from "../assets/JSON/tenzoId.json";
import tenzoTech from "../assets/JSON/tenzoTech.json";
import tenzoTechIMG from "../assets/static/projectIMG/tenzoID/ImageArray";
import "../styles/CSS/ProjectDetail.css";

const projectMap = {
  ID: tenzoId,
  tech: tenzoTech,
};
const imageMap = {
  ID: tenzoTechIMG,
  tech: tenzoTechIMG,
};

function ProjectDetail() {
  const [page, setPage] = useState("design");
  const { id } = useParams<{ id: string }>();

  const project = projectMap[id as "ID" | "tech"];
  const images = imageMap[id as "ID" | "tech"];
  const design = project[0];
  const dev = project[1];
  const techStack = design.tech!.map((t, index) => {
    return index < design.tech!.length - 1 ? (
      <>
        {t}
        <span> ~ </span>
      </>
    ) : (
      t
    );
  });

  let headingIndex = 0;
  let paragraphIndex = 0;
  let imageIndex = 0;

  const headings = page === "design" ? design.headings : dev.headings;
  const content = page === "design" ? design.content : dev.content;
  const paragraphs = page === "design" ? design.paragraphs : dev.paragraphs;

  const pageContent = content.map((order) => {
    switch (order) {
      case "HEADING": {
        headingIndex++;
        return <h3>{headings[headingIndex - 1]}</h3>;
      }
      case "CONTENT": {
        paragraphIndex++;
        return <p>{paragraphs![paragraphIndex - 1]}</p>;
      }
      case "PHOTO": {
        imageIndex++;
        return <img src={images[imageIndex - 1]} alt="project" />;
      }
    }
  });

  return (
    <>
      <Navbar color="gradient-orange" />
      <div className="header-wrapper">
        <h1>{design.title}</h1>
        <h2>{design.subtitle}</h2>
        <h4>{techStack}</h4>
      </div>
      <div className="selector">
        <span
          onClick={() => {
            setPage("design");
          }}
          className={page === "design" ? "active" : "no-active"}
        >
          design
        </span>
        <span className="selector-dash">//</span>
        <span
          onClick={() => {
            setPage("dev");
          }}
          className={page === "dev" ? "active" : "no-active"}
        >
          development
        </span>
      </div>
      <section className="content">{pageContent}</section>
      <Footer />
    </>
  );
}

export default ProjectDetail;
