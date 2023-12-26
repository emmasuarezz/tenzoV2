import { Navbar, Footer, ProjectCard } from "../Components";
import "../styles/CSS/Projects.css";
import projectsEntries from "../assets/JSON/projects.json";

function Projects() {
  return (
    <>
      <Navbar color="gradient-green" />
      <main className="projects-container">
        <h1>The things worth sharing...</h1>
        <h2>
          Here you can learn everything about each project:
          <br /> from the thinking and designing to the code writing.
        </h2>
        <section>
          {projectsEntries.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tech1={project.tech1}
              tech2={project.tech2}
              tech3={project.tech3}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Projects;
