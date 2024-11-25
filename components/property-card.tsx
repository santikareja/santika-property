import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/supabase';
import { MapPin, Bed, Bath, Move, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group rounded-lg overflow-hidden border bg-card transition-all hover:shadow-lg">
      <Link 
        href={`/properties/${property.id}`}
        className="block transition-transform hover:-translate-y-1 duration-200"
      >
        <div className="relative h-48 w-full">
          <Image
            src={property.images[0] || 'https://via.placeholder.com/400x300'}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-200"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="mt-2 flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(property.price)}
            </span>
            <div className="flex items-center space-x-4">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Move className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.size} m²</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button
          size="sm"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={() => {
            window.open(
              `https://wa.me/6282114812842?text=Halo, saya tertarik dengan properti "${property.title}" dengan harga ${formatCurrency(property.price)}`,
              '_blank'
            );
          }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Hubungi via WhatsApp
        </Button>
      </div>
    </div>
  );
}