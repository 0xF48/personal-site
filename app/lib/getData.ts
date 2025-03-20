import { readItems, readSingleton } from '@directus/sdk';
import { Schema } from './publicEnums';
import { useClient } from './useClient';
import { cache } from 'react';


// Create a cached data fetching function
export const getData = cache(async (): Promise<Schema> => {
	const { client } = useClient()

	const [ys_projects, ys_globals] = await Promise.all([
		client.request(readItems('ys_projects', {
			limit: -1,
			//@ts-ignore
			fields: ['*', 'screenshots.*', 'screenshots.directus_files_id.*'],
			//@ts-ignore
			deep: {
				screenshots: {
					_limit: -1
				}
			}
		})),
		client.request(readSingleton('ys_globals'))
	]);

	// Sort projects by end_date in descending order (newest first)
	const sortedProjects = [...ys_projects].sort((a, b) => {

		if (!a.end_date) return -1;  // Projects without end dates go last
		if (!b.end_date) return 1;
		return b.end_date.localeCompare(a.end_date); // Sort descending (newest first)
	});

	return { ys_projects: sortedProjects, ys_globals };

});