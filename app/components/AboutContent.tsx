import { getAssetURL } from "../lib/getAssetURL";
import { getData } from "../lib/getData";

export async function AboutContent() {
	const { ys_globals: globals } = await getData()

	return <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-0'>
		<div className='w-full flex-row flex items-center justify-center md:items-end md:justify-end px-10 mt-20 md:mt-0 md:p-10 relative border-main-600 border-dashed border-r-1'>
			<img className="h-[15em] rounded-2xl " src={getAssetURL(globals.photo)} alt={globals.name} />
		</div>
		<div className='p-10'>
			<div className='mt-6 font-display text-lg'
				dangerouslySetInnerHTML={{ __html: globals.about }}>
			</div>
		</div>
	</div>
}