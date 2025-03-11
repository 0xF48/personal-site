import { getData } from "../lib/getData";
import { ProjectItem } from "./ProjectItem";

export async function ProjectsList() {
	const { ys_projects: projects } = await getData();

	return <div>
		{projects.map(project => <ProjectItem key={project.id} project={project} />)}
	</div>
}