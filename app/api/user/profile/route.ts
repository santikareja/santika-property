import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const authCookie = cookies().get("santika_auth");
  
  if (!authCookie) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // In a real app, you would decode the auth cookie to get the user ID
    // For now, we'll use a mock user
    const user = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}