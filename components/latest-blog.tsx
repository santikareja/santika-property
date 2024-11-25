"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
}

// Temporary mock data until Supabase is configured
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tips Membeli Rumah Pertama',
    excerpt: 'Panduan lengkap untuk membeli rumah pertama Anda dengan bijak.',
    cover_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Investasi Properti di 2024',
    excerpt: 'Tren dan peluang investasi properti di tahun 2024.',
    cover_image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Desain Interior Minimalis',
    excerpt: 'Inspirasi desain interior minimalis untuk rumah modern.',
    cover_image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    created_at: new Date().toISOString(),
  },
];

export default function LatestBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using mock data for now
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Blog Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Blog Terbaru</h2>
        <Link
          href="/blog"
          className="text-primary hover:text-primary/80 flex items-center gap-2"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <article className="group">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
              <time className="text-xs text-muted-foreground">
                {formatDistance(new Date(post.created_at), new Date(), {
                  addSuffix: true,
                  locale: id,
                })}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}