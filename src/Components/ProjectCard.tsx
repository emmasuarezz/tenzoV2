import "../styles/CSS/ProjectCard.css";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
};

function ProjectCard({ id, title, description, tech, link }: ProjectCardProps) {
  const techStack = tech.map((t, index) => {
    return index < tech.length - 1 ? (
      <>
        {t}
        <span> ~ </span>
      </>
    ) : (
      t
    );
  });
  const url = "/project/" + link;

  return (
    <Link to={url}>
      <div className="card-wrapper">
        <div className="card-header">
          <h3>
            <span>{id}.</span> {title}
          </h3>
          <h4>{techStack}</h4>
        </div>
        <div className="card-body">
          <p>
            {description} <span>read more...</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
