import { getAssetURL } from "../lib/getAssetURL";
import { getData } from "../lib/getData";

export async function AboutContent() {
	const { ys_globals: globals } = await getData()

	return <div className='w-full flex flex-col md:flex-row gap-0 border-main-600 border-solid border-b-1 items-start justify-center content-center'>
		<div className='w-full md:w-[20rem] shrink-0 h-full flex items-center justify-center py-10 relative '>
			<img className="h-[15em] rounded-2xl " src={getAssetURL(globals.photo)} alt={globals.name} />
		</div>
		<div className='p-10'>
			<div className='mt-6 font-display text-lg'
				dangerouslySetInnerHTML={{ __html: globals.about }}>
			</div>
		</div>
	</div>
}