"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function PropertyLocation({
  address,
  coordinates,
}: PropertyLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Maps implementation will be added later
    // For now, we'll show a placeholder
  }, [coordinates]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lokasi</h2>
      
      <div className="flex items-start space-x-2">
        <MapPin className="h-5 w-5 text-primary mt-1" />
        <p className="text-muted-foreground">{address}</p>
      </div>

      <div
        ref={mapRef}
        className="h-[400px] w-full rounded-lg bg-muted flex items-center justify-center"
      >
        <p className="text-muted-foreground">Peta akan segera tersedia</p>
      </div>
    </div>
  );
}