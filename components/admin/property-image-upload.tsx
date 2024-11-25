"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface PropertyImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function PropertyImageUpload({
  images,
  onChange,
  maxImages = 10,
}: PropertyImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      if (images.length + files.length > maxImages) {
        toast.error(`Maksimal ${maxImages} gambar`);
        return;
      }

      setUploading(true);
      try {
        // Here we'll implement actual image upload to Supabase Storage
        // For now, we'll use temporary URLs
        const newImages = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        onChange([...images, ...newImages]);
      } catch (error) {
        toast.error("Gagal mengunggah gambar");
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      onChange(newImages);
    },
    [images, onChange]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Foto Properti</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {images.length < maxImages && (
            <div className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleUpload}
                disabled={uploading}
              />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {uploading ? "Mengunggah..." : "Tambah Foto"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Unggah maksimal {maxImages} foto. Format yang didukung: JPG, PNG.
        Maksimal 5MB per file.
      </p>
    </div>
  );
}