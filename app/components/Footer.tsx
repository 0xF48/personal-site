"use client";
import { GLOBAL, navOptions } from "../lib/publicEnums";
import { PencilIcon } from "lucide-react";
import { getAssetURL } from "../lib/getAssetURL";

import cn from "classnames"
export function Footer() {


	return <footer className="p-4 text-center  min-h-[10rem] font-mono text-sm text-main-300" >
		{/* <div className="flex flex-row justify-center mt-10">

		</div> */}
		<div className="pt-10 flex w-full items-center justify-center flex-col">

			{/* <div className="w-fit flex flex-row items-center justify-center">
				designed by <a href='https://lerp.io/credits'><img src={getAssetURL('64fd2314-6618-4446-9546-4087e55e4a26')} className="w-6 ml-4"></img></a>
			</div> */}
			<a href={GLOBAL.DIRECTUS_API} target="_blank" rel="noreferrer" className=" mt-8 p-2 px-5 flex items-center justify-center hover:bg-main-400 group rounded-xl hover:text-white">
				<PencilIcon className="text-main-300  group-hover:text-white" width={16} strokeWidth={2}></PencilIcon>
			</a>

		</div>
	</footer >
}