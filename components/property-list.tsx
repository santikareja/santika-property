"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property, supabase } from '@/lib/supabase';
import PropertyCard from './property-card';

export default function PropertyList() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        let query = supabase.from('properties').select('*');

        // Apply filters
        const type = searchParams.get('type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const location = searchParams.get('location');

        if (type) query = query.eq('type', type);
        if (minPrice) query = query.gte('price', minPrice);
        if (maxPrice) query = query.lte('price', maxPrice);
        if (location) query = query.ilike('location', `%${location}%`);

        const { data, error } = await query;
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Tidak ada properti yang sesuai dengan filter yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}