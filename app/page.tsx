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

		<div className='border-long-dashed-t w-full p-10 flex items-center justify-center font-mono text-main-200'>
			My Projects
		</div>
		<ProjectsList />
	</>
}