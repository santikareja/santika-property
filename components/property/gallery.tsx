"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="relative h-[400px] cursor-pointer"
          onClick={() => setShowLightbox(true)}
        >
          <Image
            src={images[0]}
            alt={`${title} - Main Image`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative h-[190px] cursor-pointer"
              onClick={() => {
                setCurrentImage(index + 1);
                setShowLightbox(true);
              }}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover rounded-lg"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-semibold">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-screen-lg h-[80vh]">
          <div className="relative h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={() => setShowLightbox(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative h-full">
              <Image
                src={images[currentImage]}
                alt={`${title} - Image ${currentImage + 1}`}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={previousImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <span className="bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                {currentImage + 1} / {images.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}