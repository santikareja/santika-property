import { Metadata } from 'next';
import PropertyList from '@/components/property-list';
import PropertyFilters from '@/components/property-filters';

export const metadata: Metadata = {
  title: 'Daftar Properti',
  description: 'Temukan properti impian Anda dari koleksi lengkap kami.',
};

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Daftar Properti</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <PropertyFilters />
        </aside>
        <main className="lg:col-span-3">
          <PropertyList />
        </main>
      </div>
    </div>
  );
}