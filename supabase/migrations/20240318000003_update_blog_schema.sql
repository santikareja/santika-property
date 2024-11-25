-- Add new columns to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS schema JSONB,
ADD COLUMN IF NOT EXISTS image_credit JSONB,
ADD COLUMN IF NOT EXISTS suggested_links TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS auto_generated BOOLEAN DEFAULT false;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();