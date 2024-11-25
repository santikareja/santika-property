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
    // Mock saved properties for now
    const properties = [
      {
        id: "1",
        title: "Modern House in Jakarta",
        description: "Beautiful modern house in the heart of Jakarta",
        price: 2500000000,
        location: "Jakarta Selatan",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        size: 250,
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"],
        features: ["Swimming Pool", "Garden", "Garage"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ properties });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authCookie = cookies().get("santika_auth");
  
  if (!authCookie) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // In a real app, remove the property from the user's saved properties
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}