import Link from "next/link";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Santika Property</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Temukan properti impian Anda bersama kami. Kami menawarkan berbagai
              pilihan properti berkualitas dengan lokasi strategis.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/properties" className="text-sm hover:text-primary">
                  Properti
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Kontak</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm">
                <span className="block font-medium">Alamat:</span>
                Jalan Emas Raya No 23 Karawaci Tangerang
              </li>
              <li className="text-sm">
                <span className="block font-medium">Telepon:</span>
                <a href="tel:+6282114812842" className="hover:text-primary">
                  +62 821 1481 2842
                </a>
              </li>
              <li className="text-sm">
                <span className="block font-medium">WhatsApp:</span>
                <a 
                  href="https://wa.me/6282114812842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  +62 821 1481 2842
                </a>
              </li>
              <li className="text-sm">
                <span className="block font-medium">Email:</span>
                info@santikaproperty.com
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Sosial Media</h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/6282114812842"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-500"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Santika Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}