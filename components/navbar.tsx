"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Home className="h-6 w-6" />
              <span className="text-xl font-bold">Santika Property</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link 
                href="/properties" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Properti
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Tentang Kami
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Kontak
              </Link>
              <Button 
                asChild
                className="bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Link href="/admin">Admin Panel</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/properties"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Properti
            </Link>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Kontak
            </Link>
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}