"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Property } from "@/lib/supabase";
import PropertyImageUpload from "./property-image-upload";

const propertySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  price: z.string().min(1, "Harga wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  type: z.enum(["house", "apartment", "land", "commercial"]),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  size: z.string().min(1, "Luas wajib diisi"),
  buildingSize: z.string().optional(),
  features: z.string(),
});

export default function PropertiesManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      type: "house",
      bedrooms: "",
      bathrooms: "",
      size: "",
      buildingSize: "",
      features: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    setLoading(true);
    try {
      const propertyData = {
        ...data,
        price: parseInt(data.price),
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        size: parseInt(data.size),
        buildingSize: data.buildingSize ? parseInt(data.buildingSize) : null,
        features: data.features.split(",").map((f) => f.trim()),
        images,
      };

      if (editingProperty) {
        // Update existing property
        await updateProperty(editingProperty.id, propertyData);
        toast.success("Properti berhasil diperbarui");
      } else {
        // Create new property
        await createProperty(propertyData);
        toast.success("Properti berhasil ditambahkan");
      }

      setIsOpen(false);
      form.reset();
      setImages([]);
      setEditingProperty(null);
      // Refresh properties list
      fetchProperties();
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    form.reset({
      title: property.title,
      description: property.description,
      price: property.price.toString(),
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      size: property.size.toString(),
      buildingSize: property.buildingSize?.toString() || "",
      features: property.features.join(", "),
    });
    setImages(property.images);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus properti ini?")) {
      try {
        await deleteProperty(id);
        toast.success("Properti berhasil dihapus");
        fetchProperties();
      } catch (error) {
        toast.error("Gagal menghapus properti");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Kelola Properti</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Properti
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Judul</th>
                <th className="text-left py-2">Lokasi</th>
                <th className="text-left py-2">Tipe</th>
                <th className="text-left py-2">Harga</th>
                <th className="text-left py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b">
                  <td className="py-2">{property.title}</td>
                  <td>{property.location}</td>
                  <td className="capitalize">{property.type}</td>
                  <td>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(property.price)}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(property)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Edit Properti" : "Tambah Properti"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" {...form.register("title")} />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipe Properti</Label>
                <Select
                  value={form.watch("type")}
                  onValueChange={(value) => form.setValue("type", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe properti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Rumah</SelectItem>
                    <SelectItem value="apartment">Apartemen</SelectItem>
                    <SelectItem value="land">Tanah</SelectItem>
                    <SelectItem value="commercial">Komersial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  type="number"
                  {...form.register("price")}
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" {...form.register("location")} />
                {form.formState.errors.location && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Luas Tanah (m²)</Label>
                <Input
                  id="size"
                  type="number"
                  {...form.register("size")}
                />
                {form.formState.errors.size && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.size.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingSize">Luas Bangunan (m²)</Label>
                <Input
                  id="buildingSize"
                  type="number"
                  {...form.register("buildingSize")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Kamar Tidur</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...form.register("bedrooms")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Kamar Mandi</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  {...form.register("bathrooms")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={5}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">
                Fasilitas (pisahkan dengan koma)
              </Label>
              <Input id="features" {...form.register("features")} />
            </div>

            <PropertyImageUpload
              images={images}
              onChange={setImages}
              maxImages={10}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}