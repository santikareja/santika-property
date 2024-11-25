<content>import { NextResponse } from "next/server";

const ADMIN_KEY = "amc@!FpU28<xf_`t]KP3y9";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();

    if (key !== ADMIN_KEY) {
      return NextResponse.json(
        { error: "Invalid admin key" },
        { status: 401 }
      );
    }

    // Create response with cookie
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie
    response.cookies.set("santika_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}</content>