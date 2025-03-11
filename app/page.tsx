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
		<AboutContent />
		<ProjectsList />
	</>
}