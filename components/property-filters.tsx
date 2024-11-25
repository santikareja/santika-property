"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const propertyTypes = [
  { label: 'Rumah', value: 'rumah' },
  { label: 'Apartemen', value: 'apartemen' },
  { label: 'Ruko & Komersial', value: 'komersial' },
  { label: 'Tanah', value: 'tanah' },
];

const priceRanges = [
  { label: 'Di bawah 500 Juta', min: 0, max: 500000000 },
  { label: '500 Juta - 1 Miliar', min: 500000000, max: 1000000000 },
  { label: '1 Miliar - 2 Miliar', min: 1000000000, max: 2000000000 },
  { label: 'Di atas 2 Miliar', min: 2000000000, max: null },
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    priceRange: '',
    location: searchParams.get('location') || '',
  });

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (filters.type) {
      params.append('type', filters.type);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      params.append('minPrice', min);
      if (max) params.append('maxPrice', max);
    }
    
    if (filters.location) {
      params.append('location', filters.location);
    }
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-card">
      <div className="space-y-2">
        <Label>Tipe Properti</Label>
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe properti" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rentang Harga</Label>
        <Select
          value={filters.priceRange}
          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih rentang harga" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range, index) => (
              <SelectItem
                key={index}
                value={`${range.min}-${range.max || ''}`}
              >
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Lokasi</Label>
        <Input
          placeholder="Masukkan lokasi"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      <Button className="w-full" onClick={handleFilter}>
        Terapkan Filter
      </Button>
    </div>
  );
}