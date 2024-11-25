import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PropertyGallery from "@/components/property/gallery";
import PropertyInfo from "@/components/property/info";
import PropertyDescription from "@/components/property/description";
import PropertyLocation from "@/components/property/location";
import PropertyContact from "@/components/property/contact";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!property) {
    notFound();
  }

  const formattedPrice = formatCurrency(property.price);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery images={property.images} title={property.title} />
          <PropertyInfo
            price={formattedPrice}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            landSize={property.size}
            buildingSize={property.building_size}
            type={property.type}
            location={property.location}
          />
          <PropertyDescription
            description={property.description}
            features={property.features}
          />
          <PropertyLocation
            address={property.location}
            coordinates={property.coordinates}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <PropertyContact propertyId={property.id} title={property.title} />
          </div>
        </div>
      </div>
    </div>
  );
}