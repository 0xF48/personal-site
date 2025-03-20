import { GithubIcon, LinkIcon, MailIcon } from "lucide-react";
import { getAssetURL } from "../lib/getAssetURL";
import { getData } from "../lib/getData";

export async function AboutContent() {
	const { ys_globals: globals } = await getData()

	return <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-b-1 border-main-600 border-dashed'>
		<div className='w-full flex-row flex items-center justify-center md:items-end md:justify-end px-10 mt-20 md:mt-0 md:p-10 relative border-main-600 border-dashed border-r-1'>
			<img className="h-[15em] rounded-2xl " src={getAssetURL(globals.photo)} alt={globals.name} />
		</div>
		<div className='p-10'>
			<div className='mt-6 font-display text-lg'
				dangerouslySetInnerHTML={{ __html: globals.about }}>
			</div>
			<div className='mt-6  text-lg font-mono  flex flex-col gap-4'>
				<a href={'mailto:' + globals.email} className="flex text-blue-500 flex-row items-center hover:underline cursor-pointer hover:text-blue-400">
					<MailIcon size={24} className="inline mr-2" />
					{globals.email}
				</a>
				<a href={globals.linkedin} className="flex flex-row text-green-500 items-center hover:underline cursor-pointer hover:text-green-400">
					<LinkIcon size={24} className="inline mr-2" />
					linkedin
				</a>
				<a href={globals.github} className="flex flex-row text-orange-500 items-center hover:underline cursor-pointer hover:text-orange-400">
					<GithubIcon size={24} className="inline mr-2" />
					github
				</a>



			</div>
		</div>
	</div>
}