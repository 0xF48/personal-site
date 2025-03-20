"use client";
import { useEffect, useRef, useState } from "react";

import { Project, Schema } from "../lib/publicEnums";
import { useNav } from "../lib/useNav";
import { ProjectItemInfo } from "./ProjectItem";
import { getAssetURL } from "../lib/getAssetURL";
import { ImageSliderNav, PrevNextProjectNav } from "./ImageDisplaySliderBox";
import { createPortal } from "react-dom";
import { Screenshot } from "./Screenshot";





export function GalleryImageDisplaySliderBox({ project, focusScreenshotIndex }: { project: Project, focusScreenshotIndex: number }) {



	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [scollOffset, setScrollOffset] = useState(-1)



	const screenshots = project.screenshots






	const previewSlidePageIndex = Math.max(0, Math.min(screenshots.length - 1, focusScreenshotIndex))


	useEffect(() => {
		if (!scrollContainerRef.current) return;
		const scollOffset = scrollContainerRef.current.clientWidth * previewSlidePageIndex
		scrollContainerRef.current.scrollTo({
			left: scollOffset,
			behavior: 'auto'
		})
		setScrollOffset(scollOffset)
	}, [scrollContainerRef.current, previewSlidePageIndex]);


	return <div className="w-full h-full py-4 px-2 bg-black rounded-2xl">
		<div
			ref={scrollContainerRef}
			className="w-full h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-hide bg-black relative">
			<div className="pointer-events-none absolute left-0 top-0 w-screen h-screen z-0 from-main-500/0 bg-linear-180 to-black from-50% to-100%"></div>
			{scrollContainerRef.current ? <div className="w-fit h-full flex flex-row">
				{screenshots.map((screenshot, index) => <Screenshot key={index} containerWidth={scrollContainerRef.current.clientWidth} isLink={true} screenshot={screenshot} />)}
			</div> : null}
		</div>
	</div>


}



export function GalleryOverlay({ data }: { data: Schema }) {

	const { focusProjectId, focusScreenshotIndex } = useNav()


	const project = data.ys_projects.find(project => project.id === focusProjectId) || data.ys_projects[0]


	// const nextProject = data.ys_projects.find(project => project.id === focusProjectId + 1)



	return createPortal(
		<div>
			<div className="fixed left-0 top-0 w-screen h-screen z-10 bg-main-900"></div>
			<div
				className="fixed left-0 top-0 w-screen h-screen z-20 scale-150"
				style={{
					backgroundImage: `url(${getAssetURL(project.cover)})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					filter: "blur(25px)",
				}}
			>

			</div>
			<div className="fixed left-0 top-0 w-screen h-screen z-40 from-main-500/50 bg-linear-90 to-main-700 to-50%"></div>
			<div className="fixed left-0 top-0 w-screen h-screen flex flex-row z-50 md:px-10">
				<div className="w-full md:w-2/3 h-full md:p-10 relative pb-15">
					<GalleryImageDisplaySliderBox project={project} focusScreenshotIndex={focusScreenshotIndex} />
					<div className="hidden md:flex absolute left-1/2 bottom-18 transform -translate-x-1/2">
						<ImageSliderNav project={project} />
					</div>
					<div className="absolute left-1/2 bottom-18 transform -translate-x-1/2 w-full px-20 pointer-events-none ">
						<PrevNextProjectNav data={data} />
					</div>
				</div>
				<div className="hidden w-1/3 relative md:flex flex-col justify-between py-10">
					<ProjectItemInfo project={project} />
				</div>
			</div>
		</div>,
		document.body
	);


}