import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "../Components";
import { useState } from "react";
import tenzoId from "../assets/JSON/tenzoId.json";
import tenzoTech from "../assets/JSON/tenzoTech.json";
import tenzoStar from "../assets/JSON/tenzoStar.json";
import tenzoIDImg from "../assets/static/projectIMG/tenzoID/ImageArray";
import tenzoTechImg from "../assets/static/projectIMG/tenzoTech/ImageArray";
import "../styles/CSS/utils.css";
import "../styles/CSS/ProjectDetail.css";

const projectMap = {
  ID: tenzoId,
  tech: tenzoTech,
  star: tenzoStar,
};
const imageMap = {
  ID: tenzoIDImg,
  tech: tenzoTechImg,
  star: tenzoIDImg,
};

function ProjectDetail() {
  const [page, setPage] = useState("design");
  const { id } = useParams<{ id: string }>();

  const project = projectMap[id as "ID" | "tech" | "star"];
  const images = imageMap[id as "ID" | "tech" | "star"];
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

  const headings = page === "design" ? design.headings : dev.headings;
  const content = page === "design" ? design.content : dev.content;
  const paragraphs = page === "design" ? design.paragraphs : dev.paragraphs;
  const img = page === "design" ? images[0] : images[1];

  let headingIndex = 0;
  let paragraphIndex = 0;
  let imageIndex = 0;
  let pageContent = [];

  for (let index = 0; index < content.length; index++) {
    let order = content[index];
    switch (order) {
      case "HEADING": {
        headingIndex++;
        pageContent.push(
          <h3 key={order + headingIndex}>{headings[headingIndex - 1]}</h3>
        );
        break;
      }
      case "CONTENT": {
        paragraphIndex++;
        pageContent.push(
          <p key={order + paragraphIndex}>{paragraphs![paragraphIndex - 1]}</p>
        );
        break;
      }
      case "PHOTO": {
        imageIndex++;
        let images = [
          <img
            key={order + imageIndex}
            src={img[imageIndex - 1]}
            alt={"projectImg" + (imageIndex - 1)}
          />,
        ];

        // Check if the next order(s) is also "PHOTO" and add the image(s) to the array.
        while (content[index + 1] === "PHOTO") {
          index++;
          imageIndex++;
          images.push(
            <img
              key={order + imageIndex}
              src={img[imageIndex - 1]}
              alt={"projectImg" + imageIndex}
            />
          );
        }

        pageContent.push(<div className="img-wrapper">{images}</div>);
        break;
      }
    }
  }

  return (
    <>
      <Navbar color="gradient-orange" />
      <div className="header-wrapper">
        <h1>{design.title}</h1>
        <h2>{design.subtitle}</h2>
        <h4 className="text-center">{techStack}</h4>
        <Link className="link-project" to={design.link as string}>
          Check it out!
        </Link>
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
      <main className="content">{pageContent}</main>
      <Footer />
    </>
  );
}

export default ProjectDetail;
