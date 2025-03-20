"use client";

import { Project, Schema } from "../lib/publicEnums";
import { useEffect, useRef, useState } from "react";
import { useNav } from "../lib/useNav";
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeft, ChevronRight } from "lucide-react";
import cn from "classnames";
import { Screenshot } from "./Screenshot";
import { FixedSizeList as List } from 'react-window';

export function ImageSliderNav({ project, localFocusScreenshotIndex, setLocalFocusScreenshotIndex }: { project: Project, localFocusScreenshotIndex?: any, setLocalFocusScreenshotIndex?: any }) {
	let { setFocusScreenshotIndex, focusScreenshotIndex } = useNav()


	if (setLocalFocusScreenshotIndex) {
		focusScreenshotIndex = localFocusScreenshotIndex
		setFocusScreenshotIndex = (projectId: number, screenshotIndex: number) => {
			setLocalFocusScreenshotIndex(screenshotIndex)
		}
	}



	const projectId = project.id
	const screenshots = project.screenshots

	const previewSlidePageIndex = Math.max(0, Math.min(screenshots.length - 1, focusScreenshotIndex))


	// const lastPageIndex = previewSlidePageIndex == screenshots.length - 1

	// const stopNextNav = (lastPageIndex == true && !nextProject) ? true : false
	const stopPrevNav = previewSlidePageIndex == 0 ? true : false
	const stopNextNav = previewSlidePageIndex == screenshots.length - 1 ? true : false

	function navToPreviousSlidePage() {
		setFocusScreenshotIndex(projectId, Math.max(0, previewSlidePageIndex - 1))
	}

	function navToNextSlidePage() {
		if (previewSlidePageIndex == screenshots.length - 1) {
			return
		} else {
			setFocusScreenshotIndex(projectId, previewSlidePageIndex + 1)
		}
	}

	return <div className="h-12 flex flex-row gap-4 items-center justify-center w-fit">
		<button
			onClick={navToPreviousSlidePage}
			className={cn(
				"transition-all  h-12 w-12 rounded-2xl items-center justify-center content-center flex outline-none ring-3",
				stopPrevNav == false ? 'ring-main-500 hover:bg-main-500 cursor-pointer bg-main-600 text-white' : 'ring-main-600 cursor-not-allowed bg-main-700 text-main-400')}>

			<ChevronLeft size={24} />
		</button>
		<button
			onClick={navToNextSlidePage}
			className={cn(
				"transition-all  h-12 w-32 gap-2 rounded-2xl items-center justify-center content-center flex outline-none ring-3",
				stopNextNav == false ? 'ring-main-500 hover:bg-main-500 cursor-pointer bg-main-600 text-white' : 'ring-main-600 cursor-not-allowed bg-main-700 text-main-400')}>
			<ChevronRight size={24} />
			<div className="font-mono font-bold flex flex-row">
				<div className="w-5 flex flex-row items-end justify-end">
					{previewSlidePageIndex + 1}
				</div>
				<div className="text-main-400">/</div>
				<div className="text-main-200">{project.screenshots.length}</div>
			</div>
		</button>
	</div>
}


export function PrevNextProjectNav({ data }: { data: Schema }) {
	let { setFocusProjectId, focusProjectId } = useNav()


	const { ys_projects: projects } = data


	const projectIndex = projects.findIndex(project => project.id === focusProjectId)
	const project = projects[projectIndex]
	const nextProject = projects[projectIndex + 1]
	const prevProject = projects[projectIndex - 1]
	const stopNextNav = nextProject ? false : true
	const stopPrevNav = prevProject ? false : true


	function navToNextProject() {
		if (nextProject) {
			setFocusProjectId(String(nextProject.id))
		}
	}

	function navToPreviousProject() {
		if (prevProject) {
			setFocusProjectId(String(prevProject.id))
		}
	}

	return <div className="h-12 flex flex-row gap-4 items-center justify-between w-full pointer-events-none ">
		<button
			onClick={stopPrevNav == false ? navToPreviousProject : null}
			className={cn(
				"pointer-events-auto transition-all  h-12 w-12 rounded-2xl items-center justify-center content-center flex outline-none ring-3"
				, stopPrevNav == false ? 'ring-main-500 hover:bg-main-500 cursor-pointer bg-main-600 text-white' : 'ring-main-600 cursor-not-allowed bg-main-700 text-main-400'
			)}>
			<ChevronFirstIcon size={24} />
			{/* {prevProject ? prevProject.name : null} */}
		</button>
		<button
			onClick={navToNextProject}
			className={cn(
				"pointer-events-auto transition-all  h-12 w-32 gap-2 rounded-2xl items-center justify-center content-center flex outline-none ring-3",
				stopNextNav == false ? 'ring-main-500 hover:bg-main-500 cursor-pointer bg-main-600 text-white' : 'ring-main-600 cursor-not-allowed bg-main-700 text-main-400')}>
			<ChevronLastIcon size={24} />
			<div className="font-mono font-bold flex flex-row" >
				<div className="w-5 flex flex-row items-end justify-end">{projectIndex + 1}</div><div className="text-main-400">/</div><div className="text-main-200">{projects.length}</div>
			</div>

		</button >


	</div >
}




export function PreviewImageDisplaySliderBox({ project }: { project: Project }) {




	const { screenshots, id: projectId } = project
	const [scollOffset, setScrollOffset] = useState(-1)
	const { toggleGalleryView, setFocusScreenshotIndex } = useNav()
	const [focusScreenshotIndex, setLocalFocusScreenshotIndex] = useState(0)
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const previewSlidePageIndex = Math.max(0, Math.min(screenshots.length - 1, focusScreenshotIndex))



	useEffect(() => {
		if (!scrollContainerRef.current) return;
		const scollOffset = scrollContainerRef.current.clientWidth * previewSlidePageIndex;
		scrollContainerRef.current.scrollTo({
			left: scollOffset,
			behavior: 'auto'
		})
		setScrollOffset(scollOffset)

		// listen for scrollcontainer ref resize
		const resizeObserver = new ResizeObserver(() => {
			if (!scrollContainerRef.current) return;
			const scollOffset = scrollContainerRef.current.clientWidth * previewSlidePageIndex;
			scrollContainerRef.current.scrollTo({
				left: scollOffset,
				behavior: 'auto'
			})
			setScrollOffset(scollOffset)
		})

		resizeObserver.observe(scrollContainerRef.current)

		return () => {
			resizeObserver.disconnect()
		}

	}, [scrollContainerRef.current, previewSlidePageIndex]);


	return <div className="relative w-full h-full p-4">
		<pre className='absolute left-1/2 -translate-x-1/2 -top-6 text-main-500 font-mono text-xs'>
			scroll or click to expand
		</pre>
		<div
			ref={scrollContainerRef}
			onClick={() => {
				// console.log('clicked', projectId, previewSlidePageIndex)
				setFocusScreenshotIndex(projectId, previewSlidePageIndex)
				// toggleGalleryView(true)
			}}
			className="w-full h-full rounded-2xl overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-hide">
			{scrollContainerRef.current ? <div className="w-fit h-full flex flex-row">
				{screenshots.map((image, index) =>
					<Screenshot screenshot={image} containerWidth={scrollContainerRef.current.clientWidth} isLink={false} key={image.directus_files_id.id} />
				)}
			</div> : null}
		</div>

		<div className='absolute left-1/2 -translate-x-1/2 -bottom-6'>
			<ImageSliderNav project={project} localFocusScreenshotIndex={focusScreenshotIndex} setLocalFocusScreenshotIndex={setLocalFocusScreenshotIndex} />
		</div>

	</div>
}