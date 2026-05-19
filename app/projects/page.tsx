export const metadata = {
  title: "Projects | Hwang Structural Engineers",
  description:
    "Explore structural engineering projects completed by Hwang Structural Engineers across residential, commercial, and public sectors.",
};
import ProjectsClient from "../../components/ProjectsClient";
import { getProjects } from "../../lib/getProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}