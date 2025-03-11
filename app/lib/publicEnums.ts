

export const navOptions = [
	{
		label: 'About',
		href: '/'
	}
]

export type ProjectScreenshot = {
	directus_files_id: {
		id: string;
		height: number;
		width: number;
		type: string;
	}
}
export type Project = {
	name: string;
	start_date: string;
	end_date?: string;
	info: string;
	id: number;
	cover: string;
	github_url?: string;
	website_url?: string
	youtube_id?: string;
	screenshots: ProjectScreenshot[];
}

export type Globals = {
	photo: string;
	name: string;
	subtitle: string;
	about: string;
	email: string;
	github: string;
	linkedin: string;
}

export type Schema = {
	// Define your collections and their types
	ys_globals: Globals
	ys_projects: Project[]
	// ...other collections
}

export const enum GLOBAL {
	DIRECTUS_API = "http://admin.lerp.io:3001/",
}