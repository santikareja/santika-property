"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Temukan Aset Properti
            <span className="block text-yellow-400">Impianmu Disini</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xl text-gray-300">
            Kami membantu Anda menemukan properti ideal sesuai kebutuhan dan budget Anda.
          </p>
          
          <div className="mt-10">
            <div className="flex items-center justify-center gap-4">
              <Input
                type="text"
                placeholder="Cari lokasi atau tipe properti..."
                className="max-w-sm bg-white/90"
              />
              <Button size="lg">
                <Search className="mr-2 h-4 w-4" />
                Cari
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}