import "../styles/CSS/ProjectCard.css";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  tech1: string;
  tech2: string;
  tech3: string;
};

function ProjectCard({
  id,
  title,
  description,
  tech1,
  tech2,
  tech3,
}: ProjectCardProps) {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <h3>
          <span>{id}.</span> {title}
        </h3>
        <h4>
          {tech1} <span>~</span> {tech2} <span>~</span> {tech3}{" "}
        </h4>
      </div>
      <div className="card-body">
        <p>
          {description} <span>read more...</span>
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
