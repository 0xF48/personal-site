import { format } from "date-fns";
import { Project } from "../lib/publicEnums";
import { PreviewImageDisplaySliderBox } from "./ImageDisplaySliderBox";
import { CodeXmlIcon, GlobeIcon } from "lucide-react";
import cn from "classnames";
import { ProjectItemInfoDescription } from "./ProjectItemInfoDescription";
import { YouTube } from "./YouTube";


export function ProjectItemInfo({ project }: { project: Project }) {
	return <div className="h-full w-full flex flex-col">
		<h1 className="font-black font-display text-4xl">{project.name}</h1>
		<div className="flex flex-row gap-2 mb-6 mt-2 font-mono text-sm text-main-200">
			<div>{format(new Date(project.start_date), 'MM/yyyy')}</div>
			<div className="text-main-400">-</div>
			<div className={cn(project.end_date ? 'text-main-200' : 'text-amber-300')}>{project.end_date ? format(new Date(project.end_date), 'MM/yyyy') : 'present'}</div>
		</div>
		<ProjectItemInfoDescription project={project} />
		<div className="flex flex-col gap-4 mt-8">
			{project.youtube_id ? <YouTube id={project.youtube_id} /> : null}
			{project.website_url ?
				<a target='_blank' href={project.website_url} className="text-green-500 flex flex-row gap-2 font-medium font-mono hover:underline hover:text-green-400">
					<GlobeIcon size={24} />
					Project Website
				</a> : null}
			{project.github_url ? <a target='_blank' href={project.github_url} className="text-amber-500 flex flex-row gap-2 font-medium font-mono hover:underline hover:text-amber-400">
				<CodeXmlIcon size={24} />
				Code Repository
			</a> : null}
		</div>
	</div >
}

export function ProjectItem({ project }: { project: Project }) {

	return <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-main-600 border-dashed border-t-1 mb-20 items-stretch justify-evenly content-stretch">
		<div className="p-5 md:p-10 h-full w-full flex flex-row items-center md:items-start justify-center md:justify-end border-dashed md:border-r-1 border-main-600">
			<PreviewImageDisplaySliderBox project={project} />
		</div>
		<div className="p-10 h-full w-full">
			<ProjectItemInfo key={project.id} project={project} />
		</div>
	</div>
}