-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom_user_data table to extend auth.users
CREATE TABLE IF NOT EXISTS public.custom_user_data (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'agent', 'user')),
  saved_properties UUID[] DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{"email": true, "push": true, "properties": true, "blog": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE public.custom_user_data ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own data" ON public.custom_user_data
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.custom_user_data
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.custom_user_data (id, name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();