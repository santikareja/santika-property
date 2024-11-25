"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function SavedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await fetch("/api/user/saved-properties");
      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      toast.error("Gagal memuat properti tersimpan");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (propertyId: string) => {
    try {
      await fetch(`/api/user/saved-properties/${propertyId}`, {
        method: "DELETE",
      });
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      toast.success("Properti dihapus dari daftar tersimpan");
    } catch (error) {
      toast.error("Gagal menghapus properti");
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-6">Properti Tersimpan</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-xl font-semibold mb-6">Properti Tersimpan</h2>

      {properties.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Anda belum menyimpan properti apapun
          </p>
          <Button asChild className="mt-4">
            <Link href="/properties">Jelajahi Properti</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-center space-x-4 p-4 rounded-lg border group hover:bg-muted/50"
            >
              <div className="relative h-20 w-32 rounded-lg overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <Link
                  href={`/properties/${property.id}`}
                  className="text-lg font-medium hover:text-primary line-clamp-1"
                >
                  {property.title}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
                <p className="text-primary font-medium mt-1">
                  {formatCurrency(property.price)}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUnsave(property.id)}
                className="opacity-0 group-hover:opacity-100"
              >
                Hapus
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}