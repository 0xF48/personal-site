import React from 'react';
import { ProjectsList } from './components/ProjectsList';
import { AboutContent } from './components/AboutContent';
import { getData } from './lib/getData';
import { GalleryOverlay } from './components/GalleryOverlay';


export default async function Home({ searchParams }: {
	searchParams: any
}) {
	const data = await getData()
	const params = await searchParams;
	const isGalleryView = params?.gallery === '1'
	return isGalleryView ? <GalleryOverlay data={data} /> : <>
		<div className="h-50 flex items-end justify-center font-display text-4xl font-black pb-6">
			Yury Sidorov
		</div>

		<AboutContent />
		<div className="h-30 flex items-center justify-center">
			<div className="w-8 h-3 rounded-md bg-main-600 "></div>
		</div>
		<div className='border-b-1 border-main-600 border-dashed w-full p-4 flex items-center justify-start font-mono text-main-300'>
			projects
		</div>
		<ProjectsList />
	</>
}