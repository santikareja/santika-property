import Link from 'next/link';
import { Building2, Home, Building, Trees } from 'lucide-react';

const propertyTypes = [
  {
    icon: Home,
    name: 'Rumah',
    type: 'rumah',
    description: 'Temukan rumah impian Anda',
  },
  {
    icon: Building2,
    name: 'Apartemen',
    type: 'apartemen',
    description: 'Hunian modern dan strategis',
  },
  {
    icon: Building,
    name: 'Ruko & Komersial',
    type: 'komersial',
    description: 'Properti untuk bisnis Anda',
  },
  {
    icon: Trees,
    name: 'Tanah',
    type: 'tanah',
    description: 'Investasi masa depan',
  },
];

const priceRanges = [
  {
    name: 'Di bawah 500 Juta',
    range: { min: 0, max: 500000000 },
  },
  {
    name: '500 Juta - 1 Miliar',
    range: { min: 500000000, max: 1000000000 },
  },
  {
    name: '1 Miliar - 2 Miliar',
    range: { min: 1000000000, max: 2000000000 },
  },
  {
    name: 'Di atas 2 Miliar',
    range: { min: 2000000000, max: null },
  },
];

export default function PropertyCategories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Kategori Properti</h2>

      <div className="grid gap-12">
        {/* Property Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {propertyTypes.map((category) => (
            <Link
              key={category.type}
              href={`/properties?type=${category.type}`}
              className="group p-6 text-center rounded-lg border bg-card hover:shadow-md transition-all"
            >
              <category.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* Price Ranges */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Rentang Harga</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {priceRanges.map((range, index) => (
              <Link
                key={index}
                href={`/properties?minPrice=${range.range.min}${
                  range.range.max ? `&maxPrice=${range.range.max}` : ''
                }`}
                className="p-4 text-center rounded-lg border bg-card hover:shadow-md transition-all"
              >
                <span className="text-lg font-medium text-primary">{range.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}