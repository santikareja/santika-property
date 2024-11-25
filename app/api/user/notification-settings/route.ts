import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const authCookie = cookies().get("santika_auth");
  
  if (!authCookie) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Mock settings for now
    const settings = {
      email: true,
      push: true,
      properties: true,
      blog: true,
    };

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authCookie = cookies().get("santika_auth");
  
  if (!authCookie) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { settings } = await request.json();
    // In a real app, save these settings to the database
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}