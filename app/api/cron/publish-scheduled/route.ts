import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  // Verify cron secret to ensure only authorized calls
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date().toISOString();

    // Get scheduled posts that should be published
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", false)
      .lte("scheduled_for", now);

    if (error) throw error;

    // Publish each post
    for (const post of posts) {
      await supabase
        .from("blog_posts")
        .update({ published: true })
        .eq("id", post.id);
    }

    return NextResponse.json({
      success: true,
      publishedCount: posts.length,
    });
  } catch (error) {
    console.error("Error publishing scheduled posts:", error);
    return NextResponse.json(
      { error: "Failed to publish posts" },
      { status: 500 }
    );
  }
}