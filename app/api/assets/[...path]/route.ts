import { NextRequest, NextResponse } from 'next/server';
import { GLOBAL } from '../../../lib/publicEnums';

export async function GET(
	request: NextRequest,
	{ params }: any
) {
	try {
		// Extract the path
		let { path } = await params


		// Create URL to your Directus instance
		const url = `${GLOBAL.DIRECTUS_API}assets/${path[0]}${request.nextUrl.search}`;


		// Fetch the image from Directus
		const response = await fetch(url);

		// If the response isn't ok, return an error
		if (!response.ok) {
			return new NextResponse('Error fetching asset', {
				status: response.status
			});
		}

		// Get the image data as array buffer
		const imageData = await response.arrayBuffer();

		// Create a new response with appropriate content type
		const contentType = response.headers.get('content-type') || 'application/octet-stream';

		// Return the image with correct headers
		return new NextResponse(imageData, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		});
	} catch (error) {
		console.error('Error proxying asset:', error);
		return new NextResponse('Server error', { status: 500 });
	}
}