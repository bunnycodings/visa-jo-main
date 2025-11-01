'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  time: number;
  profilePhoto?: string;
}

interface TestimonialsProps {
  title?: string;
}

const Testimonials = ({ title = 'What Our Customers Say' }: TestimonialsProps) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/google-places/reviews');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          // Silently fail - don't show testimonials section if API is not configured
          console.warn('Google Places Reviews API error:', errorData);
          setError('Reviews not available');
          return;
        }
        const data = await response.json();
        if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setError('No reviews available');
        }
      } catch (err) {
        // Silently fail - don't show testimonials section if API fails
        console.warn('Failed to fetch reviews:', err);
        setError('Reviews not available');
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Loading customer reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null; // Don't show section if no reviews or error
  }

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                {review.profilePhoto ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2">
                    <Image 
                      src={review.profilePhoto} 
                      alt={review.name}
                      width={64}
                      height={64}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {review.name}
              </h3>
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;