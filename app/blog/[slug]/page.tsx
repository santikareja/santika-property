import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { fetchBlogPostBySlug } from "@/lib/supabase";
import BlogSidebar from "@/components/blog/blog-sidebar";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3">
          <article>
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-8">
                <span className="capitalize">{post.categories?.name}</span>
                <span className="mx-2">•</span>
                <time>
                  {format(new Date(post.created_at), "d MMMM yyyy", {
                    locale: id,
                  })}
                </time>
              </div>

              <div className="prose max-w-none">
                {post.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </main>

        <aside className="lg:col-span-1">
          <BlogSidebar categories={[]} />
        </aside>
      </div>
    </div>
  );
}