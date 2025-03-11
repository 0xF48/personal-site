export function getAssetURL(fileId: string, options?: {
	width?: number;
	height?: number;
	fit?: 'cover' | 'contain' | 'inside' | 'outside';
}) {
	if (!fileId) return '';

	// Use your Next.js API route instead of directly accessing Directus
	let url = `/api/assets/${fileId}`;

	// Add query parameters if options are provided
	if (options) {
		const params = new URLSearchParams();
		if (options.width) params.append('width', options.width.toString());
		if (options.height) params.append('height', options.height.toString());
		if (options.fit) params.append('fit', options.fit);

		url += `?${params.toString()}`;
	}

	return url;
}