import { useParams } from "react-router-dom";
import { Navbar, Footer } from "../Components";
import { useState } from "react";
import tenzoId from "../assets/JSON/tenzoId.json";
import tenzoTech from "../assets/JSON/tenzoTech.json";
import "../styles/CSS/ProjectDetail.css";

const projectMap = {
  ID: tenzoId,
  tech: tenzoTech,
};

function ProjectDetail() {
  const [page, setPage] = useState("design");
  const { id } = useParams<{ id: string }>();

  const project = projectMap[id as "ID" | "tech"];
  const design = project[0];
  const tech = design.tech;
  const techStack = tech!.map((t, index) => {
    return index < tech!.length - 1 ? (
      <>
        {t}
        <span> ~ </span>
      </>
    ) : (
      t
    );
  });

  const designPage = (
    <>
      <h3>{design.headings[0]}</h3>
      <p>{design.content[0]}</p>
      <p>{design.content[1]}</p>
      <h3>{design.headings[1]}</h3>
      <p>{design.content[2]}</p>
      <p>{design.content[3]}</p>
      <h3>{design.headings[2]}</h3>
      <p>{design.content[4]}</p>
      <p>{design.content[5]}</p>
      <p>{design.content[6]}</p>
    </>
  );
  const devPage = (
    <>
      <h1>Development</h1>
    </>
  );

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
      <section className="content">
        {page === "design" ? designPage : devPage}
      </section>
      <Footer />
    </>
  );
}

export default ProjectDetail;
