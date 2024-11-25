import Link from "next/link";
import { Category } from "@/lib/supabase";

interface BlogSidebarProps {
  categories: Category[];
}

export default function BlogSidebar({ categories }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Kategori</h2>
        {categories.length > 0 ? (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Belum ada kategori.</p>
        )}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
        <p className="text-sm text-gray-600 mb-4">
          Dapatkan update terbaru seputar properti langsung di inbox Anda.
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="Email Anda"
            className="w-full px-3 py-2 rounded-md border bg-background"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}