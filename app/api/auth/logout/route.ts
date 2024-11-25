import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Remove auth cookie
    response.cookies.delete("santika_auth");
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}