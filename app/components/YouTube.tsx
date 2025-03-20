'use client';
import { Clipper } from "./Clipper";

export function YouTube({ id }: { id: string }) {
	return <Clipper className='aspect-video w-full relative overflow-hidden rounded-2xl mb-5 bg-main-950'>
		<iframe className='absolute inset-0 w-full h-full'
			src={`https://www.youtube.com/embed/${id}`}
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
		/>
	</Clipper>
}