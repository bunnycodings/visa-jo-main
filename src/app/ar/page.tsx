'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { defaultHeroContent, defaultWhyChooseUsContent, defaultPopularDestinationsContent, defaultHowItWorksContent } from '@/types/models/SiteContent';
import type { HeroContent, WhyChooseUsContent, PopularDestinationsContent, HowItWorksContent } from '@/types/models/SiteContent';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import Hero from '@/components/sections/Hero';

// Dynamically import below-the-fold components for faster initial load
const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs'), {
  ssr: true,
});

const PopularDestinations = dynamic(() => import('@/components/sections/PopularDestinations'), {
  ssr: true,
});

const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'), {
  ssr: true,
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  ssr: false, // Client-side only since it uses browser APIs
});

export default function ArabicHome() {
  const [hero, setHero] = useState<HeroContent>(defaultHeroContent);
  const [why, setWhy] = useState<WhyChooseUsContent>(defaultWhyChooseUsContent);
  const [popular, setPopular] = useState<PopularDestinationsContent>(defaultPopularDestinationsContent);
  const [how, setHow] = useState<HowItWorksContent>(defaultHowItWorksContent);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useContentRefresh();

  useEffect(() => {
    // Fetch all content from API
    const fetchContent = async () => {
      try {
        // Fetch all content in parallel with Arabic locale
        const [heroRes, whyRes, popularRes, howRes] = await Promise.all([
          fetch('/api/content/hero?locale=ar', { cache: 'no-store' }),
          fetch('/api/content/why?locale=ar', { cache: 'no-store' }),
          fetch('/api/content/popular?locale=ar', { cache: 'no-store' }),
          fetch('/api/content/how?locale=ar', { cache: 'no-store' }),
        ]);

        if (heroRes.ok) {
          const heroData = await heroRes.json();
          setHero(heroData);
        }

        if (whyRes.ok) {
          const whyData = await whyRes.json();
          setWhy(whyData);
        }

        if (popularRes.ok) {
          const popularData = await popularRes.json();
          setPopular(popularData);
        }

        if (howRes.ok) {
          const howData = await howRes.json();
          setHow(howData);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        // Keep using defaults if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [refreshTrigger]);

  // Show loading state or default content while fetching
  if (loading) {
    return (
      <div className="bg-white">
        <Hero
          bannerText={hero.bannerText}
          title={hero.title}
          subtitle={hero.subtitle}
          ctaText={hero.ctaText}
          ctaHref={hero.ctaHref}
          isActive={hero.isActive}
          backgroundImage={hero.backgroundImage}
        />
        <WhyChooseUs
          badgeText={why.badgeText}
          title={why.title}
          subtitle={why.subtitle}
          features={why.features}
        />
        <PopularDestinations
          title={popular.title}
          items={popular.items}
        />
        <HowItWorks
          title={how.title}
          steps={how.steps}
        />
        <Testimonials />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero
        bannerText={hero.bannerText}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        ctaHref={hero.ctaHref}
        isActive={hero.isActive}
        backgroundImage={hero.backgroundImage}
      />
      <WhyChooseUs
        badgeText={why.badgeText}
        title={why.title}
        subtitle={why.subtitle}
        features={why.features}
      />
      <PopularDestinations
        title={popular.title}
        items={popular.items}
      />
      <HowItWorks
        title={how.title}
        steps={how.steps}
      />
      <Testimonials />
    </div>
  );
}

