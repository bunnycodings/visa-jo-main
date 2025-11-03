import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyDtGagLe57lZB0QrLSknpyDhhjnF3lGVPs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    // Fetch place details from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry,name,formatted_phone_number,opening_hours,website,rating&key=${GOOGLE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 24 hours
        next: { revalidate: 86400 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch place details');
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: 'Failed to fetch place details', details: data.status },
        { status: 400 }
      );
    }

    const result = data.result;

    // Format the response
    const placeDetails = {
      formattedAddress: result.formatted_address || '',
      location: {
        lat: result.geometry?.location?.lat || 0,
        lng: result.geometry?.location?.lng || 0,
      },
      name: result.name || '',
      phone: result.formatted_phone_number || '',
      website: result.website || '',
      rating: result.rating || 0,
      openingHours: result.opening_hours?.weekday_text || [],
    };

    return NextResponse.json(placeDetails, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch place details',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

