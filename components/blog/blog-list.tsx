"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { id } from "date-fns/locale";
import { BlogPost } from "@/lib/supabase";

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [posts] = useState(initialPosts);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          Belum ada artikel yang dipublikasikan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.id} className="group">
          <Link 
            href={`/blog/${post.slug}`}
            className="block hover:shadow-md transition-shadow rounded-lg p-4"
          >
            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-200"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span className="capitalize">{post.categories?.name}</span>
                  <span className="mx-2">•</span>
                  <time>
                    {formatDistance(new Date(post.created_at), new Date(), {
                      addSuffix: true,
                      locale: id,
                    })}
                  </time>
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}