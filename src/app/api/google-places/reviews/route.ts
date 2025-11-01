import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get API key from environment (next.config.js or .env.local)
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    
    // Get place_id from query params or environment variable
    const placeId = searchParams.get('place_id') || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';
    
    if (!GOOGLE_PLACES_API_KEY) {
      console.error('Google Places API key not configured. Please add GOOGLE_PLACES_API_KEY to your .env.local file.');
      return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 });
    }
    
    if (!placeId) {
      console.warn('Google Places API: Place ID not provided');
      return NextResponse.json({ 
        error: 'Place ID not provided', 
        message: 'Add NEXT_PUBLIC_GOOGLE_PLACE_ID to .env.local or pass place_id as query parameter.',
        reviews: [] // Return empty array instead of error to prevent UI breaking
      }, { status: 400 });
    }

    console.log('Fetching reviews for place ID:', placeId);
    
    // Fetch place details including reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name,place_id&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data);
      return NextResponse.json({ 
        error: 'Google Places API error', 
        status: data.status,
        message: data.error_message || 'Failed to fetch reviews',
        details: data 
      }, { status: 400 });
    }

    const reviews = data.result.reviews || [];
    const overallRating = data.result.rating || 0;
    const totalRatings = data.result.user_ratings_total || 0;
    const placeName = data.result.name || '';

    console.log(`Found ${reviews.length} reviews for ${placeName}`);

    // Filter for 5-star reviews only (best reviews)
    const fiveStarReviews = reviews.filter((review: any) => review.rating === 5);
    
    console.log(`Found ${fiveStarReviews.length} five-star reviews`);

    // Return latest 3 best reviews with profile photos
    const latestReviews = fiveStarReviews.slice(0, 3).map((review: any) => {
      // Google Places API returns profile_photo_url which is the correct field for profile photos
      const profilePhotoUrl = review.profile_photo_url || '';
      
      console.log(`Review from ${review.author_name}:`, {
        profilePhotoUrl: profilePhotoUrl,
        rating: review.rating,
        hasPhoto: !!profilePhotoUrl
      });
      
      return {
        name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profilePhoto: profilePhotoUrl,
        relativeTime: review.relative_time_description || '',
      };
    });

    return NextResponse.json({
      success: true,
      reviews: latestReviews,
      overallRating: overallRating,
      totalRatings: totalRatings,
      placeName: placeName,
    });

  } catch (error) {
    console.error('Google Places Reviews API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

