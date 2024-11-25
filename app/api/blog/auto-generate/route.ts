import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateArticle, generateMetadata, suggestInternalLinks } from "@/lib/openai";
import { getRelevantImage } from "@/lib/unsplash";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const authCookie = cookies().get("santika_auth");
  if (!authCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { keyword, customPrompt, schedule, minWords, maxWords } = await request.json();

    // Generate article content
    const content = await generateArticle({
      keyword,
      customPrompt,
      minWords,
      maxWords,
    });

    // Get relevant image
    const image = await getRelevantImage(keyword);
    if (!image) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }

    // Generate metadata and SEO elements
    const metadata = await generateMetadata(keyword, content);

    // Get suggested internal links
    const suggestedLinks = await suggestInternalLinks(content);

    // Create the blog post
    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title: keyword,
          slug: slugify(keyword),
          content,
          excerpt: content.substring(0, 200) + "...",
          cover_image: image.url,
          author_id: "system", // Replace with actual author ID
          category_id: metadata.category,
          published: true,
          meta_title: metadata.metaTitle,
          meta_description: metadata.metaDescription,
          tags: metadata.tags,
          schema: metadata.schema,
          image_credit: image.credit,
          suggested_links: suggestedLinks,
          scheduled_for: schedule,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}