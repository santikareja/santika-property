import { createClient } from '@supabase/supabase-js';

// Default to development URLs if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-for-development';

// Validate URL format
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

if (!isValidUrl(supabaseUrl)) {
  throw new Error('Invalid Supabase URL. Please check your environment variables.');
}

if (!supabaseKey) {
  throw new Error('Missing Supabase Anon Key. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  saved_properties?: string[];
  notification_preferences?: {
    email: boolean;
    push: boolean;
    properties: boolean;
    blog: boolean;
  };
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'land' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  buildingSize?: number;
  images: string[];
  features: string[];
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author_id: string;
  category_id: string;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  categories?: Category;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

// User functions
export async function createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
  const { data: user, error } = await supabase
    .from('users')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return user;
}

export async function updateUser(id: string, data: Partial<User>) {
  const { data: user, error } = await supabase
    .from('users')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return user;
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function fetchUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Property functions
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProperty(data: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
  const { data: property, error } = await supabase
    .from('properties')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return property;
}

export async function updateProperty(id: string, data: Partial<Property>) {
  const { data: property, error } = await supabase
    .from('properties')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return property;
}

export async function deleteProperty(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Blog functions
export async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories (
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return post;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return post;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Category functions
export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

export async function toggleSavedProperty(userId: string, propertyId: string) {
  const { data: user } = await fetchUserById(userId);
  const savedProperties = user.saved_properties || [];
  
  const isAlreadySaved = savedProperties.includes(propertyId);
  const updatedProperties = isAlreadySaved
    ? savedProperties.filter(id => id !== propertyId)
    : [...savedProperties, propertyId];

  const { error } = await supabase
    .from('users')
    .update({ saved_properties: updatedProperties })
    .eq('id', userId);

  if (error) throw error;
  return !isAlreadySaved;
}