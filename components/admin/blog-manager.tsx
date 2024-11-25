"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { BlogPost, Category, fetchBlogPosts, fetchCategories } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

const blogPostSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
  excerpt: z.string().min(1, "Ringkasan wajib diisi"),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [coverImage, setCoverImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category_id: "",
      meta_title: "",
      meta_description: "",
    },
  });

  useEffect(() => {
    loadBlogPosts();
    loadCategories();
  }, []);

  async function loadBlogPosts() {
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (error) {
      toast.error("Gagal memuat artikel blog");
    }
  }

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Gagal memuat kategori");
    }
  }

  const onSubmit = async (data: z.infer<typeof blogPostSchema>) => {
    setLoading(true);
    try {
      const postData = {
        ...data,
        slug: slugify(data.title),
        cover_image: coverImage,
        published: true,
        author_id: "1", // Replace with actual author ID from auth system
      };

      if (editingPost) {
        await updateBlogPost(editingPost.id, postData);
        toast.success("Artikel berhasil diperbarui");
      } else {
        await createBlogPost(postData);
        toast.success("Artikel berhasil ditambahkan");
      }

      setIsOpen(false);
      form.reset();
      setCoverImage("");
      setEditingPost(null);
      loadBlogPosts();
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category_id: post.category_id,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
    });
    setCoverImage(post.cover_image);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await deleteBlogPost(id);
        toast.success("Artikel berhasil dihapus");
        loadBlogPosts();
      } catch (error) {
        toast.error("Gagal menghapus artikel");
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Here we'll implement actual image upload to Supabase Storage
      // For now, we'll use a temporary URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Kelola Blog</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Artikel
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Judul</th>
                <th className="text-left py-2">Kategori</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Tanggal</th>
                <th className="text-left py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="py-2">{post.title}</td>
                  <td>{post.categories?.name}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        post.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    {new Date(post.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Artikel" : "Tambah Artikel"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={form.watch("category_id")}
                onValueChange={(value) => form.setValue("category_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.category_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex items-center gap-4">
                {coverImage && (
                  <div className="relative w-40 h-24 rounded-lg overflow-hidden">
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("cover-image")?.click()}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {coverImage ? "Ganti Gambar" : "Upload Gambar"}
                </Button>
                <input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                {...form.register("excerpt")}
                rows={3}
              />
              {form.formState.errors.excerpt && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.excerpt.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                rows={10}
              />
              {form.formState.errors.content && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input id="meta_title" {...form.register("meta_title")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  {...form.register("meta_description")}
                  rows={2}
                />
              </div>
            </div>

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