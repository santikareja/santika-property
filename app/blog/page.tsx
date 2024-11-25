import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogList from "@/components/blog/blog-list";
import BlogSidebar from "@/components/blog/blog-sidebar";

export const metadata: Metadata = {
  title: "Blog - Santika Property",
  description: "Artikel dan insight seputar properti dari Santika Property",
};

async function getBlogData() {
  try {
    const [postsResult, categoriesResult] = await Promise.all([
      supabase
        .from("blog_posts")
        .select(`
          *,
          categories (
            name
          )
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true }),
    ]);

    return {
      posts: postsResult.data || [],
      categories: categoriesResult.data || [],
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      posts: [],
      categories: [],
    };
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getBlogData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3">
          <BlogList initialPosts={posts} />
        </main>
        <aside className="lg:col-span-1">
          <BlogSidebar categories={categories} />
        </aside>
      </div>
    </div>
  );
}