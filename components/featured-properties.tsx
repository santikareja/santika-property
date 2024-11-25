"use client";

import { useEffect, useState } from 'react';
import { Property } from '@/lib/supabase';
import PropertyCard from './property-card';

// Temporary mock data until Supabase is configured
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern House in Jakarta',
    description: 'Beautiful modern house in the heart of Jakarta',
    price: 2500000000,
    location: 'Jakarta Selatan',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
    features: ['Swimming Pool', 'Garden', 'Garage'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Luxury Apartment',
    description: 'Luxurious apartment with city view',
    price: 1800000000,
    location: 'Jakarta Pusat',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
    features: ['Gym', 'Pool', 'Security'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using mock data for now
    setProperties(mockProperties);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Properti Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Properti Unggulan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}