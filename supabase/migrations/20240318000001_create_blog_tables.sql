-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  author_id UUID NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  published BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  FOREIGN KEY (author_id) REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for categories
CREATE POLICY "Allow public read access" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated create" ON public.categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update own" ON public.categories
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS policies for blog_posts
CREATE POLICY "Allow public read access" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated read all" ON public.blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated create" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update own" ON public.blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated' AND author_id = auth.uid());

-- Add sample categories
INSERT INTO public.categories (name, slug)
VALUES
  ('Tips Properti', 'tips-properti'),
  ('Investasi', 'investasi'),
  ('Desain Interior', 'desain-interior');