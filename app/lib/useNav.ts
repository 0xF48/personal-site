"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function useNav() {
	const router = useRouter(); // Initialize the router
	const searchParams = useSearchParams()
	const isGalleryView = searchParams.get('gallery') == '1'
	const focusProjectId = Number(searchParams.get('project_id'))
	const focusScreenshotIndex = Number(searchParams.get('screenshot_index') || 0)

	function setFocusProjectId(projectId: string) {
		const params = new URLSearchParams(searchParams.toString())
		params.set('project_id', projectId)
		params.set('screenshot_index', '0')
		router.replace(`${window.location.pathname}?${params.toString()}`, {
			scroll: false
		})
	}

	function setFocusScreenshotIndex(projectId, screenshotIndex: number) {

		const params = new URLSearchParams(searchParams.toString())
		params.set('screenshot_index', screenshotIndex.toString())
		params.set('project_id', projectId)
		params.set('gallery', '1')
		router.replace(`${window.location.pathname}?${params.toString()}`, {
			scroll: false
		})
	}

	function toggleGalleryView(value: boolean) {
		const params = new URLSearchParams(searchParams.toString())
		try {
			if (value === true) {
				document.documentElement.requestFullscreen().catch(err => {
					console.error(`Error attempting to enable fullscreen: ${err.message}`);
				});
			} else {
				document.exitFullscreen().catch(err => {
					console.error(`Error attempting to exit fullscreen: ${err.message}`);
				});
			}

		} catch (err) {
			console.error("Fullscreen API not supported");
		}
		if (value === true) {
			params.set('gallery', '1')
		} else {
			params.delete('gallery')
		}
		router.push(`${window.location.pathname}?${params.toString()}`)
	}


	return {
		isGalleryView,
		focusProjectId,
		focusScreenshotIndex,
		toggleGalleryView,
		setFocusProjectId,
		setFocusScreenshotIndex
	}
}