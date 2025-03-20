import { format } from "date-fns";
import { Project } from "../lib/publicEnums";
import { PreviewImageDisplaySliderBox } from "./ImageDisplaySliderBox";
import { CodeXmlIcon, GlobeIcon } from "lucide-react";
import cn from "classnames";
import { ProjectItemInfoDescription } from "./ProjectItemInfoDescription";
import { YouTube } from "./YouTube";
import { Clipper } from "./Clipper";

export function ProjectItemHeader({ project }: { project: Project }) {
	return <div className="w-full flex flex-col">
		<h1 className="font-black font-display text-4xl break-words">{project.name}</h1>
		<div className="flex flex-row gap-2 md:mb-6 mt-2 font-mono text-sm text-main-200">
			<div>{format(new Date(project.start_date), 'MM/yyyy')}</div>
			<div className="text-main-400">-</div>
			<div className={cn(project.end_date ? 'text-main-200' : 'text-amber-300')}>{project.end_date ? format(new Date(project.end_date), 'MM/yyyy') : 'present'}</div>
		</div>
	</div>
}

export function ProjectItemInfo({ project }: { project: Project }) {
	return <div className="h-full w-full flex flex-col">
		<div className="hidden md:flex">
			<ProjectItemHeader project={project} />
		</div>

		<ProjectItemInfoDescription project={project} />
		<div className="flex flex-col gap-4 mt-8">
			{project.youtube_id ? (

				<YouTube id={project.youtube_id} />

			) : null}
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
	return <div className="flex flex-col">
		<div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 border-main-600 border-dashed border-b-1 border-t-1 items-stretch justify-evenly content-stretch ">
			<div className="pl-10 pt-10 flex md:hidden pb-0">
				<ProjectItemHeader project={project} />
			</div>
			<div className="p-5 md:p-10 h-full w-full flex flex-row items-center md:items-start justify-center md:justify-end border-dashed md:border-r-1 border-main-600">
				<Clipper className='h-[30em] w-full relative rounded-2xl mb-5 bg-black ring-3 ring-main-600 hover:ring-main-400 transition-shadow cursor-pointer!'>
					<PreviewImageDisplaySliderBox project={project} />
				</Clipper>
			</div>
			<div className="px-5 py-4 md:p-10 h-full w-full">
				<ProjectItemInfo key={project.id} project={project} />
			</div>
		</div>
		<div className="h-30 flex items-center justify-center">
			<div className="w-8 h-3 rounded-md bg-main-600 "></div>
		</div>

	</div>
}