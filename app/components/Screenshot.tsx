import { ProjectScreenshot } from "../lib/publicEnums"
import { getAssetURL } from "../lib/getAssetURL"

export function Screenshot({ screenshot, isLink, containerWidth }: { screenshot: ProjectScreenshot, isLink: boolean, containerWidth: number }) {
	const data = screenshot.directus_files_id

	if (data.type.indexOf('video') != -1) {
		return <div
			style={{
				scrollSnapAlign: 'center',
				width: containerWidth
			}}
			className="h-full flex items-center justify-center p-4 snap-center" >
			<video className='w-auto max-w-full h-auto max-h-full' src={getAssetURL(data.id)} autoPlay loop muted playsInline />
		</div>
	}

	return <div
		style={{
			scrollSnapAlign: 'center',
			width: containerWidth
		}}
		className="h-full flex items-center justify-center p-4 snap-center" >
		<img className='w-auto max-w-full h-auto max-h-full' src={getAssetURL(data.id)} alt={data.id} />
	</div>
}