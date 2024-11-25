-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price BIGINT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('rumah', 'apartemen', 'tanah', 'komersial')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  size INTEGER NOT NULL,
  building_size INTEGER,
  images TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create RLS policies for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated create" ON public.properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update own" ON public.properties
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete own" ON public.properties
  FOR DELETE USING (auth.role() = 'authenticated');

-- Add sample properties
INSERT INTO public.properties (title, description, price, location, type, bedrooms, bathrooms, size, building_size, images, features)
VALUES
  (
    'Rumah Modern di Jakarta',
    'Rumah modern yang indah di jantung Jakarta dengan ruangan luas dan fasilitas modern.',
    2500000000,
    'Jakarta Selatan',
    'rumah',
    4,
    3,
    250,
    200,
    ARRAY[
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4'
    ],
    ARRAY['Kolam Renang', 'Taman', 'Garasi', 'Keamanan 24 Jam']
  ),
  (
    'Apartemen Mewah',
    'Apartemen mewah dengan pemandangan kota yang menakjubkan dan fasilitas premium.',
    1800000000,
    'Jakarta Pusat',
    'apartemen',
    2,
    2,
    120,
    120,
    ARRAY[
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c01',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c02'
    ],
    ARRAY['Gym', 'Kolam Renang', 'Keamanan', 'Parkir']
  );