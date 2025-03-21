"use client";

import { AirplayIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { useNav } from "./useNav";


// Import your component with ssr disabled
const MotionBox = dynamic(
	() => import("./MotionBox"),
	{ ssr: false }
);



export function NavButton() {

	const [resetKey, setResetKey] = React.useState('')

	const { isGalleryView, toggleGalleryView } = useNav()


	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				toggleGalleryView(false)
			}
		})
		window.addEventListener('resize', () => {
			setResetKey(Math.random().toString())
		})
	}, [])

	function toggleSlidesView(value: boolean) {
		toggleGalleryView(value)
	}

	let content
	let position
	if (isGalleryView == true) {
		position = 'fixed top-10 right-10 w-12 h-12'
		content = <div
			onClick={() => toggleSlidesView(false)}
			className="w-full h-full flex items-center flex-row font-display font-black justify-center text-white">
			<XIcon size={24} />
		</div>
	} else {
		position = 'fixed top-10 w-[9rem] h-12 right-10'
		content = <div
			onClick={() => toggleSlidesView(true)}
			className="w-full h-full flex items-center flex-row px-6 font-display font-bold justify-between text-white">
			<AirplayIcon size={24} />
			Gallery
		</div>
	}

	return <MotionBox
		resetKey={resetKey}
		relativeContentPosition={false}
		useAbsoluteOffset={false}
		classNames={{
			style: cn(isGalleryView ? 'bg-main-400 hover:bg-main-500' : 'bg-main-500 hover:bg-main-400', 'active:ring-main-300 ring ring-3 ring-main-400 transition-colors rounded-2xl cursor-pointer z-90 hidden md:flex'),
			position: position,
		}}>
		{content}
	</MotionBox >



}