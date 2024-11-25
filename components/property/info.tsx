import {
  Bath,
  Bed,
  Building2,
  Home,
  MapPin,
  Move,
} from "lucide-react";

interface PropertyInfoProps {
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  landSize: number;
  buildingSize?: number;
  type: string;
  location: string;
}

export default function PropertyInfo({
  price,
  bedrooms,
  bathrooms,
  landSize,
  buildingSize,
  type,
  location,
}: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{price}</h1>
        <div className="flex items-center text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bedrooms && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bed className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{bedrooms}</p>
              <p className="text-xs text-muted-foreground">Kamar Tidur</p>
            </div>
          </div>
        )}

        {bathrooms && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bath className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{bathrooms}</p>
              <p className="text-xs text-muted-foreground">Kamar Mandi</p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Move className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{landSize} m²</p>
            <p className="text-xs text-muted-foreground">Luas Tanah</p>
          </div>
        </div>

        {buildingSize && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{buildingSize} m²</p>
              <p className="text-xs text-muted-foreground">Luas Bangunan</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Home className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground capitalize">
          {type.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}