'use client';

import { Project } from "../lib/publicEnums";

export function ProjectItemInfoDescription({ project }: { project: Project }) {

	return <div className='font-display text-lg pr-0'
		dangerouslySetInnerHTML={{ __html: project.info }}>
	</div>
}