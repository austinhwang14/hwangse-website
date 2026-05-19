import type { Metadata } from "next";
import ProjectsClient from "../../components/ProjectsClient";
import { getProjects } from "../../lib/getProjects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore structural engineering projects completed by Hwang Structural Engineers.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const projects = await getProjects();
  const params = await searchParams;

  const initialProjectId = params.project ? Number(params.project) : undefined;

  return (
    <ProjectsClient
      projects={projects}
      initialProjectId={initialProjectId}
    />
  );
}