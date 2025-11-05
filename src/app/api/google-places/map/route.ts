import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  try {
    if (!GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId') || process.env.GOOGLE_PLACE_ID;

    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
    }

    // Return the embed URL that can be used in an iframe src
    // Note: Google Maps Embed API requires the API key in the URL
    // Make sure to restrict the API key by HTTP referrer in Google Cloud Console
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${placeId}&zoom=15`;
    
    return NextResponse.json({ embedUrl });
  } catch (error) {
    console.error('Error generating map URL:', error);
    return NextResponse.json({ error: 'Error loading map' }, { status: 500 });
  }
}

